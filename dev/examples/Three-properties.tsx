import * as React from "react"
import * as THREE from "three"
import { Canvas } from "react-three-fiber"
import { useMotionValue, useSpring } from "@framer"
import { motion } from "../../src/render/three"

/**
 * An example of setting properties on a mesh from R3F via
 * helper props like
 */

export const App = () => {
    const z = useMotionValue(1)
    const zSpring = useSpring(z)

    const toggleScale = () => {
        z.set(z.get() === 1 ? 2 : 1)
    }

    return (
        <Canvas
            colorManagement
            camera={{ position: [0, 0, 4] }}
            onClick={toggleScale}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
            }}
        >
            <ambientLight color="#e9f" />
            <pointLight position={[10, 10, 10]} />

            <motion.mesh key="mesh" z={zSpring}>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color="#fff" />
            </motion.mesh>
        </Canvas>
    )
}
