import { VisualElement } from "../VisualElement"
import * as THREE from "three"

// Supported Props:
// position, scale, opacity, color, rotation
export const applyValue = {
    x: (element: any, value: any) => (element.position.x = value),
    y: (element: any, value: any) => (element.position.y = value),
    z: (element: any, value: any) => (element.position.z = value),
    position: (element: any, value: [number, number, number]) => {
        element.position.x = value[0]
        element.position.y = value[1]
        element.position.z = value[2]
    },
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
    // drilling into the material from the mesh
    // motion.material doesn't seem to work since they're not components?
    color: (element: any, value: any) => element.material.color.set(value),
    opacity: (element: any, value: any) => (element.material.opacity = value),
}

export class ThreeVisualElement<E extends THREE.Object3D> extends VisualElement<
    E
> {
    clean() {}
    build() {}
    readNativeValue(_key: string) {
        return 1
    }

    getBoundingBox() {
        const Axis = { min: 0, max: 1 }
        return { x: Axis, y: Axis }
    }

    render() {
        // console.log(this.element.constructor.name)
        for (const key in this.latest) {
            const value = this.latest[key]
            if (applyValue[key]) {
                applyValue[key](this.element, value)
            }
        }
    }
}
