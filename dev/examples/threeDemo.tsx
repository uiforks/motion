import * as React from "react"
import * as THREE from "three"
import { Suspense, useState } from "react"
import { motion } from "../../src/render/three"
import { Canvas } from "react-three-fiber"
import { OrbitControls, StandardEffects } from "drei"

function Orb(props) {
    return (
        <motion.mesh {...props}>
            <meshPhongMaterial attach="material" />
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
                id,
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
            style={{
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(180deg, #d0e, #91f)",
            }}
            gl={{
                alpha: true,
                logarithmicDepthBuffer: true,
            }}
            camera={{ fov: 75, position: [0, 0, 25] }}
            onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.outputEncoding = THREE.sRGBEncoding
            }}
            onClick={() => setActive(!active)}
        >
            <Suspense fallback={null}>
                <StandardEffects smaa ao bloom bloomOpacity={0.1} />
            </Suspense>
            <ambientLight intensity={1} color="#eaf" />
            <pointLight position={[100, 100, 100]} intensity={2} />
            <group>
                {orbs.map(orb => {
                    const { x, y, z, scale, id } = orb
                    return (
                        <Orb
                            key={id}
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
