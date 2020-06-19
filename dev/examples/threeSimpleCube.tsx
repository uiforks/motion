import * as React from "react"
import * as THREE from "three"
import { useState } from "react"
import { motion } from "../../src/render/three"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"
import { rectShape, extrudeSettings } from "./threeHelpers"

function SimpleThree() {
    const [active, setActive] = useState(false)

    const variants = {
        hide: { scale: 0, rotate: -6 },
        show: { scale: 0.5, rotate: 0 },
        big: { scale: 1, rotate: -6 },
    }

    return (
        <>
            <motion.mesh
                variants={variants}
                initial={"hide"}
                animate={active ? "big" : "show"}
                transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 20,
                }}
                onClick={() => setActive(!active)}
            >
                <extrudeBufferGeometry
                    attach="geometry"
                    args={[rectShape, extrudeSettings]}
                />
                <meshDepthMaterial attach="material" />
            </motion.mesh>
        </>
    )
}

export const App = () => {
    return (
        <Canvas
            colorManagement
            style={{
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(180deg, #d0e, #91f)",
            }}
            gl={{
                logarithmicDepthBuffer: true,
                antialias: false,
            }}
            camera={{ fov: 75, position: [0, 0, 25], near: 1, far: 1000 }}
            onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.outputEncoding = THREE.sRGBEncoding
            }}
        >
            <group>
                <SimpleThree />
            </group>

            <OrbitControls />
        </Canvas>
    )
}
