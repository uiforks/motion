// import * as THREE from "three"
import { createMotionComponent, MotionComponentConfig } from "../../motion"
import { VisualElement } from "../VisualElement"
import { useConstant } from "../../utils/use-constant"
import { render } from "./render"

// @ts-nocheck
// @ts-ignore
class ThreeVisualElement extends VisualElement {
    // getBoundingBox() {}
    render() {
        this.element.position = [this.latest.x, this.latest.y, this.latest.z]
    }
}

export const useThreeVisualElement = (
    // Component: any,
    props: any,
    parent: any,
    // isStatic: any,
    ref: any
) => {
    const visualElement = useConstant(
        () => new ThreeVisualElement(parent, ref as any)
    )

    visualElement.updateConfig(props)

    return visualElement
}

const config: MotionComponentConfig<HTMLElement | SVGElement> = {
    useVisualElement: useThreeVisualElement as any,
    render: render as any,
    animationControlsConfig: {},
}

// This just caches generated components
const componentCache = new Map<string, any>()

export const motion = new Proxy(
    {},
    {
        get: (target, key: any) => {
            if (!componentCache.has(key)) {
                componentCache.set(key, createMotionComponent(key, config))
            }
            return componentCache.get(key)
        },
    }
)
