// import * as THREE from "three"
import { createMotionComponent, MotionComponentConfig } from "../../motion"
import { VisualElement } from "../VisualElement"
import { useConstant } from "../../utils/use-constant"
import { render } from "./render"
import * as THREE from "three"

// @ts-nocheck
// @ts-ignore

const applyValue = {
    x: (element: any, value: any) => (element.position.x = value),
    y: (element: any, value: any) => (element.position.y = value),
    z: (element: any, value: any) => (element.position.z = value),
    scale: (element: any, value: any) => {
        element.scale.x = value
        element.scale.y = value
        element.scale.z = value
    },
    scaleX: (element: any, value: any) => (element.scale.x = value),
    scaleY: (element: any, value: any) => (element.scale.y = value),
    scaleZ: (element: any, value: any) => (element.scale.z = value),
    rotateX: (element: any, value: any) => (element.rotation.x = value),
    rotateY: (element: any, value: any) => (element.rotation.y = value),
    rotateZ: (element: any, value: any) => (element.rotation.z = value),
    rotate: (element: any, value: any) => (element.rotation.z = value),
    color: (element: any, value: any) => {
        element.material.color.set(value)
    },
}

class ThreeVisualElement extends VisualElement {
    clean() {}
    build() {}
    readNativeValue(key: string) {
        return 1
        // if (isTransformProp(key)) {
        //     const defaultValueType = getDefaultValueType(key)
        //     return defaultValueType ? defaultValueType.default || 0 : 0
        // } else {
        //     return this.read(key)
        // }
    }
    // getBoundingBox() {}
    render() {
        // console.log(this.element.constructor.name)

        for (const key in this.latest) {
            const value = this.latest[key]
            if (this.latest.color) console.log(this.latest.color)
            if (this.latest.x) console.log(this.latest.x)
            if (applyValue[key]) {
                applyValue[key](this.element, value)
            }
        }
    }
}

export const useThreeVisualElement = (
    _Component: any,
    props: any,
    parent: any,
    _isStatic: any,
    ref: any
) => {
    console.log(ref)
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
