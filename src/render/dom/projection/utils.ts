import sync from "framesync"
import { pipe } from "popmotion"
import {
    Presence,
    SharedLayoutAnimationConfig,
} from "../../../components/AnimateSharedLayout/types"
import { Transition } from "../../../types"
import { Axis } from "../../../types/geometry"
import { eachAxis } from "../../../utils/each-axis"
import { axisBox, copyAxisBox } from "../../../utils/geometry"
import { applyBoxTransforms } from "../../../utils/geometry/delta-apply"
import { calcRelativeBox } from "../../../utils/geometry/delta-calc"
import { motionValue } from "../../../value"
import { buildLayoutProjectionTransform } from "../../html/utils/build-projection-transform"
import { VisualElement } from "../../types"
import { compareByDepth } from "../../utils/compare-by-depth"
import { isDraggable } from "../../utils/is-draggable"
import { updateLayoutDeltas } from "../../utils/projection"
import { setCurrentViewportBox } from "./relative-set"

function isProjecting(visualElement: VisualElement) {
    const { isEnabled } = visualElement.projection
    return isEnabled || visualElement.shouldResetTransform()
}

export function collectProjectingAncestors(
    visualElement: VisualElement,
    ancestors: VisualElement[] = []
) {
    const { parent } = visualElement

    if (parent) collectProjectingAncestors(parent, ancestors)

    if (isProjecting(visualElement)) ancestors.push(visualElement)

    return ancestors
}

export function collectProjectingChildren(
    visualElement: VisualElement
): VisualElement[] {
    const children: VisualElement[] = []

    const addChild = (child: VisualElement) => {
        if (isProjecting(child)) children.push(child)
        child.children.forEach(addChild)
    }

    visualElement.children.forEach(addChild)

    return children.sort(compareByDepth)
}

/**
 * Update the layoutState by measuring the DOM layout. This
 * should be called after resetting any layout-affecting transforms.
 */
export function updateLayoutMeasurement(visualElement: VisualElement) {
    if (visualElement.shouldResetTransform()) return

    const layoutState = visualElement.getLayoutState()

    visualElement.notifyBeforeLayoutMeasure(layoutState.layout)

    layoutState.isHydrated = true
    layoutState.layout = visualElement.measureViewportBox()
    layoutState.layoutCorrected = copyAxisBox(layoutState.layout)

    visualElement.notifyLayoutMeasure(
        layoutState.layout,
        visualElement.prevViewportBox || layoutState.layout
    )

    sync.update(() => rebaseProjectionTarget(visualElement))
}

/**
 * Record the viewport box as it was before an expected mutation/re-render
 */
export function snapshotViewportBox(visualElement: VisualElement) {
    if (visualElement.shouldResetTransform()) return
    visualElement.prevViewportBox = visualElement.measureViewportBox(false)

    /**
     * Update targetBox to match the prevViewportBox. This is just to ensure
     * that targetBox is affected by scroll in the same way as the measured box
     */
    rebaseProjectionTarget(visualElement, false, visualElement.prevViewportBox)
}

export function pointElementTo(element: VisualElement, target: VisualElement) {
    element.leadProjection = target.projection
    element.leadLatestValues = target.getLatestValues()

    /**
     * Subscribe to lead component's layout animations
     */
    element.unsubscribeFromLeadVisualElement?.()
    element.unsubscribeFromLeadVisualElement = pipe(
        target.onSetAxisTarget(element.scheduleUpdateLayoutProjection),
        target.onLayoutAnimationComplete(() => {
            if (element.isPresent) {
                element.presence = Presence.Present
            } else {
                element.layoutSafeToRemove?.()
            }
        })
    )
}

export class ProjectionMethods {
    element: VisualElement

    constructor(element: VisualElement) {
        this.element = element
    }

    updateTreeProjection = () => {
        this.element.layoutTree.forEach(resolveRelativeTargetBox)

        /**
         * Schedule the projection updates at the end of the current preRender
         * step. This will ensure that all layout trees will first resolve
         * relative projection boxes into viewport boxes, and *then*
         * update projections.
         */
        sync.preRender(this.updateFinalProjection, false, true)
    }

    updateFinalProjection = () => {
        this.element.layoutTree.forEach(updateLayoutProjection)
    }

    destroy() {}

    // destroy() {
    //     stopLayoutAnimation(this.element)
    //     this.unsubscribeFromLeadVisualElement()
    // }
}

function resolveRelativeTargetBox(element: VisualElement) {
    const relativeParent = getProjectionParent(element)
    const { projection } = element
    if (!projection.relativeTarget || !relativeParent) return

    calcRelativeBox(projection, relativeParent.projection)

    if (isDraggable(relativeParent)) {
        const { target } = projection
        applyBoxTransforms(target, target, relativeParent.getLatestValues())
    }
}

function updateLayoutProjection(element: VisualElement) {
    if (!element.isProjectionReady()) return

    const layoutState = element.getLayoutState()
    const { delta, treeScale } = layoutState
    const prevTreeScaleX = treeScale.x
    const prevTreeScaleY = treeScale.y
    const prevDeltaTransform = layoutState.deltaTransform

    updateLayoutDeltas(
        layoutState,
        element.leadProjection,
        element.path,
        element.getLatestValues()
    )

    element.hasViewportBoxUpdated &&
        element.notifyViewportBoxUpdate(element.leadProjection.target, delta)
    element.hasViewportBoxUpdated = false

    const deltaTransform = buildLayoutProjectionTransform(delta, treeScale)

    if (
        deltaTransform !== prevDeltaTransform ||
        // Also compare calculated treeScale, for values that rely on this only for scale correction
        prevTreeScaleX !== treeScale.x ||
        prevTreeScaleY !== treeScale.y
    ) {
        element.scheduleRender()
    }
    layoutState.deltaTransform = deltaTransform
}

/**
 * Notify the visual element that its layout is up-to-date.
 * Currently Animate.tsx uses this to check whether a layout animation
 * needs to be performed.
 */
export function notifyLayoutReady(
    element: VisualElement,
    config?: SharedLayoutAnimationConfig
) {
    setCurrentViewportBox(element)
    const { layout } = element.getLayoutState()
    element.notifyLayoutUpdate(
        layout,
        element.prevViewportBox || layout,
        config
    )
}

export function getProjectionParent(element: VisualElement) {
    if (element.projectionParent === undefined) {
        let foundParent: VisualElement | undefined = undefined

        // Search backwards through the tree path
        for (let i = element.path.length - 1; i >= 0; i--) {
            const ancestor = element.path[i]

            if (ancestor.projection.isEnabled) {
                foundParent = ancestor
                break
            }
        }

        element.projectionParent = foundParent
    }

    return element.projectionParent
}

/**
 * Rebase the projection target on top of the provided viewport box
 * or the measured layout. This ensures that non-animating elements
 * don't fall out of sync differences in measurements vs projections
 * after a page scroll or other relayout.
 */
export function rebaseProjectionTarget(
    element: VisualElement,
    force: boolean = false,
    box = element.getLayoutState().layout
) {
    const { projection } = element
    const { x, y } = getProjectionAnimationProgress(element)

    const shouldRebase =
        !projection.relativeTarget &&
        !projection.isTargetLocked &&
        !x.isAnimating() &&
        !y.isAnimating()

    if (force || shouldRebase) {
        eachAxis((axis) => {
            const { min, max } = box[axis]
            setProjectionTargetAxis(element, axis, min, max)
        })
    }
}

/**
 * Update the projection of a single axis. Schedule an update to
 * the tree layout projection.
 */
export function setProjectionTargetAxis(
    element: VisualElement,
    axis: "x" | "y",
    min: number,
    max: number,
    isRelative = false
) {
    const { projection } = element
    let target: Axis

    if (isRelative) {
        if (!projection.relativeTarget) {
            projection.relativeTarget = axisBox()
        }
        target = projection.relativeTarget[axis]
    } else {
        projection.relativeTarget = undefined
        target = projection.target[axis]
    }

    projection.isHydrated = true

    target.min = min
    target.max = max

    // Flag that we want to fire the onViewportBoxUpdate event handler
    element.hasViewportBoxUpdated = true

    element.notifySetAxisTarget()
}

/**
 * Get the motion values tracking the layout animations on each
 * axis. Lazy init if not already created.
 */
export function getProjectionAnimationProgress(element: VisualElement) {
    element.projectionTargetProgress ||= {
        x: motionValue(0),
        y: motionValue(0),
    }

    return element.projectionTargetProgress
}

export function startLayoutAnimation(
    element: VisualElement,
    axis: "x" | "y",
    transition: Transition,
    isRelative: boolean
) {
    const progress = getProjectionAnimationProgress(element)[axis]
    const { projection } = element
    const { min, max } = isRelative
        ? projection.relativeTarget![axis]
        : projection.target[axis]
    const length = max - min

    progress.clearListeners()
    progress.set(min)
    progress.set(min) // Set twice to hard-reset velocity
    progress.onChange((v) => {
        setProjectionTargetAxis(element, axis, v, v + length, isRelative)
    })

    return element.animateMotionValue!(axis, progress, 0, transition)
}

/**
 * Stop layout animations.
 */
export function stopLayoutAnimation(element: VisualElement) {
    eachAxis((axis) => getProjectionAnimationProgress(element)[axis].stop())
}

export function enableLayoutProjection(element: VisualElement) {
    element.projection.isEnabled = true
    element.layoutTree.add(element)
}

/**
 * Lock the projection target, for instance when dragging, so
 * nothing else can try and animate it.
 */
export function lockProjectionTarget({ projection }: VisualElement) {
    projection.isTargetLocked = true
}

export function unlockProjectionTarget(element: VisualElement) {
    stopLayoutAnimation(element)
    element.projection.isTargetLocked = false
}
