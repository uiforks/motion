import * as React from "react"
import { startAnimation } from "../animation/utils/transitions"
import { Presence } from "../components/AnimateSharedLayout/types"
import { Crossfader } from "../components/AnimateSharedLayout/utils/crossfader"
import { MotionProps } from "../motion/types"
import { VisualState } from "../motion/utils/use-visual-state"
import { TargetAndTransition, Transition, Variant } from "../types"
import { AxisBox2D, Point2D } from "../types/geometry"
import { MotionValue } from "../value"
import { AnimationState } from "./utils/animation-state"
import { LifecycleManager } from "./utils/lifecycles"
import { LayoutState, TargetProjection } from "./utils/state"
import { FlatTree } from "./utils/flat-tree"
import { ProjectionMethods } from "./dom/projection/utils"

export interface MotionPoint {
    x: MotionValue<number>
    y: MotionValue<number>
}

export interface VisualElement<Instance = any, RenderState = any>
    extends LifecycleManager {
    treeType: string
    depth: number
    parent?: VisualElement
    projectionParent?: VisualElement
    children: Set<VisualElement>
    variantChildren?: Set<VisualElement>
    current: Instance | null
    layoutTree: FlatTree
    manuallyAnimateOnMount: boolean
    blockInitialAnimation?: boolean
    presenceId: number | undefined
    projection: TargetProjection
    isProjectionReady: () => boolean
    isMounted(): boolean
    mount(instance: Instance): void
    unmount(): void
    isStatic?: boolean
    getInstance(): Instance | null
    path: VisualElement[]
    sortNodePosition(element: VisualElement): number
    addVariantChild(child: VisualElement): undefined | (() => void)
    getClosestVariantNode(): VisualElement | undefined
    setCrossfader(crossfader: Crossfader): void
    measureViewportBox(withTransform?: boolean): AxisBox2D

    animateMotionValue?: typeof startAnimation
    projectionMethods?: ProjectionMethods
    scheduleUpdateLayoutProjection(): void

    /**
     * Visibility
     */
    isVisible?: boolean
    setVisibility(visibility: boolean): void

    /**
     * Values
     */
    hasValue(key: string): boolean
    addValue(key: string, value: MotionValue<any>): void
    removeValue(key: string): void
    getValue(key: string): undefined | MotionValue
    getValue(key: string, defaultValue: string | number): MotionValue
    getValue(
        key: string,
        defaultValue?: string | number
    ): undefined | MotionValue
    forEachValue(callback: (value: MotionValue, key: string) => void): void
    readValue(key: string): string | number | undefined | null
    setBaseTarget(key: string, value: string | number | null): void
    getBaseTarget(key: string): number | string | undefined | null
    getStaticValue(key: string): number | string | undefined
    setStaticValue(key: string, value: number | string): void
    getLatestValues(): ResolvedValues
    getLayoutState: () => LayoutState
    projectionTargetProgress?: MotionPoint
    hasViewportBoxUpdated?: boolean

    /**
     * Render
     */
    build(): RenderState
    scheduleRender(): void
    syncRender(): void

    setProps(props: MotionProps): void
    getProps(): MotionProps
    getVariant(name: string): Variant | undefined
    getDefaultTransition(): Transition | undefined
    getVariantContext(
        startAtParent?: boolean
    ):
        | undefined
        | {
              initial?: string | string[]
              animate?: string | string[]
              exit?: string | string[]
              whileHover?: string | string[]
              whileDrag?: string | string[]
              whileFocus?: string | string[]
              whileTap?: string | string[]
          }

    /**
     * Layout projection - perhaps a candidate for lazy-loading
     * or an external interface. Move into Projection?
     */

    isPresent: boolean
    presence: Presence
    isPresenceRoot?: boolean
    prevDragCursor?: Point2D
    prevViewportBox?: AxisBox2D
    getLayoutId(): string | undefined
    animationState?: AnimationState
    resetTransform(): void
    restoreTransform(): void
    shouldResetTransform(): boolean
    makeTargetAnimatable(
        target: TargetAndTransition,
        isLive?: boolean
    ): TargetAndTransition

    leadProjection: TargetProjection
    leadLatestValues?: ResolvedValues
    layoutSafeToRemove?: () => void
    unsubscribeFromLeadVisualElement?: Function
}

export interface VisualElementConfig<Instance, RenderState, Options> {
    treeType?: string
    getBaseTarget?(
        props: MotionProps,
        key: string
    ): string | number | undefined | MotionValue
    build(
        visualElement: VisualElement<Instance>,
        renderState: RenderState,
        latestValues: ResolvedValues,
        projection: TargetProjection,
        layoutState: LayoutState,
        options: Options,
        props: MotionProps
    ): void
    sortNodePosition?: (a: Instance, b: Instance) => number
    makeTargetAnimatable(
        element: VisualElement<Instance>,
        target: TargetAndTransition,
        props: MotionProps,
        isLive: boolean
    ): TargetAndTransition
    measureViewportBox(instance: Instance, options: Options): AxisBox2D
    readValueFromInstance(
        instance: Instance,
        key: string,
        options: Options
    ): string | number | null | undefined
    resetTransform(
        element: VisualElement<Instance>,
        instance: Instance,
        props: MotionProps
    ): void
    restoreTransform(instance: Instance, renderState: RenderState): void
    render(instance: Instance, renderState: RenderState): void
    removeValueFromRenderState(key: string, renderState: RenderState): void
    scrapeMotionValuesFromProps: ScrapeMotionValuesFromProps
}

export type ScrapeMotionValuesFromProps = (
    props: MotionProps
) => { [key: string]: MotionValue | string | number }

export type UseRenderState<RenderState = any> = () => RenderState

export type VisualElementOptions<Instance, RenderState = any> = {
    visualState: VisualState<Instance, RenderState>
    parent?: VisualElement<unknown>
    variantParent?: VisualElement<unknown>
    snapshot?: ResolvedValues
    presenceId?: number | undefined
    props: MotionProps
    blockInitialAnimation?: boolean
}

export type CreateVisualElement<Instance> = (
    Component: string | React.ComponentType,
    options: VisualElementOptions<Instance>
) => VisualElement<Instance>

/**
 * A generic set of string/number values
 */
export interface ResolvedValues {
    [key: string]: string | number
}
