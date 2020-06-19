import * as React from "react"
import * as THREE from "three"
import { Suspense, useState, useRef } from "react"
import { motion } from "../../src/render/three"
import { useFrame, Canvas } from "react-three-fiber"
import { OrbitControls, StandardEffects } from "drei"
import { RoundedCube } from "./threeHelpers"
import { Asset } from "./framerLogo"

function SimpleThree(props) {
    const [clicks, setClicks] = useState(0)
    const [hover, hovered] = useState(false)
    return <group></group>
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
                alpha: true,
                logarithmicDepthBuffer: true,
            }}
            camera={{ fov: 75, position: [0, 0, 25], near: 1, far: 1000 }}
            onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.outputEncoding = THREE.sRGBEncoding
            }}
        >
            <group scale={[0.25, 0.25, 0.25]}>
                <RoundedCube />
            </group>

            <OrbitControls />
        </Canvas>
    )
}
