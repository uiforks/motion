import * as React from "react"
import * as THREE from "three"
import { useState } from "react"
import { motion } from "../../src/render/three"

export const createRoundedRectShape = (
    x = 0,
    y = 0,
    width = 5,
    height = 5,
    radius = 1
): THREE.Shape => {
    const ctx = new THREE.Shape()

    ctx.moveTo(x, y + radius)
    ctx.lineTo(x, y + height - radius)
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
    ctx.lineTo(x + width - radius, y + height)
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
    ctx.lineTo(x + width, y + radius)
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
    ctx.lineTo(x + radius, y)
    ctx.quadraticCurveTo(x, y, x, y + radius)

    return ctx
}

export const rectShape = createRoundedRectShape()

export const extrudeSettings = {
    depth: 5,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 2,
    bevelThickness: 2,
}

export const geometryArgs = [rectShape, extrudeSettings]

export function RoundedCube(props) {
    const { x, y, width, height, radius, color = "#FFFFFF" } = props
    const [roundedRectShape] = useState(
        createRoundedRectShape(x, y, width, height, radius)
    )
    return (
        <motion.mesh {...props}>
            <extrudeBufferGeometry
                args={[roundedRectShape, extrudeSettings]}
                attach="geometry"
            />
            <meshDepthMaterial
                attach="material"
                color={color}
                flatShading={false}
            />
        </motion.mesh>
    )
}
