import { Object3D } from "three"

export function getChildIndex(child: Object3D) {
    return child && child.parent ? child.parent.children.indexOf(child) : -1
}
