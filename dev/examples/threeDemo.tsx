import * as React from "react"
import { useState } from "react"
import { motion } from "../../src/render/three"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"

function Orb(props) {
    return (
        <motion.mesh {...props}>
            <meshBasicMaterial attach="material" />
            <sphereBufferGeometry attach="geometry" args={[1, 50, 50]} />
        </motion.mesh>
    )
}

const getOrbs = () => {
    let i = 0
    const circleDensity = 24
    const circles = 20
    const orbs = []

    for (let z = 5; z < circles; z++)
        for (let c = 0; c < circleDensity; c++) {
            const id = i++
            const r = 1
            const x = 0 + r * Math.cos((2 * Math.PI * c) / circleDensity)
            const y = 0 + r * Math.sin((2 * Math.PI * c) / circleDensity)
            orbs.push({
                x: x * z,
                y: y * z,
                z: z * -0.2 * Math.random(),
                scale: (circles - z) * -0.5 * (Math.random() * 0.2) + 0.3,
            })
        }

    return orbs
}

const orbs = getOrbs()

export const App = () => {
    const [active, setActive] = useState(true)
    return (
        <Canvas
            colorManagement
            style={{ width: "100vw", height: "100vh" }}
            gl={{ antialias: false, alpha: false }}
            camera={{ position: [0, 0, 25], near: 5, far: 30 }}
            onCreated={({ gl }) => gl.setClearColor("#9966ff")}
            onClick={() => setActive(!active)}
        >
            <ambientLight />
            <pointLight position={[150, 150, 150]} intensity={0.55} />

            <group>
                {orbs.map(orb => {
                    const { x, y, z, scale } = orb
                    return (
                        <Orb
                            animate={{
                                x: active ? x : 0,
                                y: active ? y : 0,
                                z: active ? z : 0,
                                scale: active ? scale : 0,
                            }}
                            transition={{ damping: 50 }}
                        />
                    )
                })}
            </group>

            <OrbitControls />
        </Canvas>
    )
}
