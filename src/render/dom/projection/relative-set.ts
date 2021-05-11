import { calcRelativeOffset } from "../../../motion/features/layout/utils"
import { eachAxis } from "../../../utils/each-axis"
import { VisualElement } from "../../types"
import {
    getProjectionParent,
    rebaseProjectionTarget,
    setProjectionTargetAxis,
} from "./utils"

export function setCurrentViewportBox(visualElement: VisualElement) {
    const projectionParent = getProjectionParent(visualElement)

    if (!projectionParent) {
        rebaseProjectionTarget(visualElement)
        return
    }

    const relativeOffset = calcRelativeOffset(
        projectionParent.getLayoutState().layout,
        visualElement.getLayoutState().layout
    )

    eachAxis((axis) => {
        setProjectionTargetAxis(
            visualElement,
            axis,
            relativeOffset[axis].min,
            relativeOffset[axis].max,
            true
        )
    })
}
