import * as React from "react"
import * as THREE from "three"
import { useCallback, useState } from "react"
import { motion } from "../../src/render/three"
import { AnimatePresence } from "@framer"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"

const GOLDEN_RATIO = (Math.sqrt(5) + 1) / 2 - 1
const GOLDEN_ANGLE = GOLDEN_RATIO * (2 * Math.PI)

export const App = () => {
    const [meshes, setMeshes] = useState([])
    const [orbit, setOrbit] = useState(false)

    const handleAdd = useCallback(() => {
        setMeshes(latestMeshes => {
            const lastMesh = latestMeshes[latestMeshes.length - 1]
            let mesh = 0

            if (typeof lastMesh === "number") {
                mesh = lastMesh + 1
            }

            return [...latestMeshes, mesh]
        })
    }, [])

    const handleRemove = useCallback(() => {
        setMeshes(latestMeshes => {
            latestMeshes.shift()

            return [...latestMeshes]
        })
    }, [])

    const handleOrbit = useCallback(() => {
        setOrbit(true)
    }, [])

    return (
        <Canvas
            colorManagement
            camera={{ position: [0, 0, 6] }}
            style={{
                width: "100vw",
                height: "100vh",
                background: "linear-gradient(180deg, #d0e, #91f)",
            }}
            gl={{
                alpha: true,
                logarithmicDepthBuffer: true,
            }}
            onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping
                gl.outputEncoding = THREE.sRGBEncoding
            }}
        >
            {orbit && (
                <>
                    <ambientLight
                        position={[1, 1, 1]}
                        intensity={1}
                        color="#eaf"
                    />
                    <pointLight position={[100, 100, 100]} intensity={2} />
                </>
            )}
            <motion.mesh initial={{ x: 0 }} onClick={handleAdd}>
                {orbit ? (
                    <meshPhongMaterial attach="material" />
                ) : (
                    <meshBasicMaterial attach="material" />
                )}
                <sphereBufferGeometry attach="geometry" args={[0.6, 16, 16]} />
            </motion.mesh>
            <motion.mesh initial={{ x: 1 }} onClick={handleRemove}>
                {orbit ? (
                    <meshPhongMaterial attach="material" />
                ) : (
                    <meshBasicMaterial attach="material" />
                )}
                <sphereBufferGeometry attach="geometry" args={[0.2, 16, 16]} />
            </motion.mesh>
            <motion.mesh initial={{ x: -1 }} onClick={handleOrbit}>
                {orbit ? (
                    <meshPhongMaterial attach="material" />
                ) : (
                    <meshBasicMaterial attach="material" />
                )}
                <sphereBufferGeometry attach="geometry" args={[0.2, 16, 16]} />
            </motion.mesh>
            <AnimatePresence>
                {meshes.map((mesh, index) => {
                    const ratio = (index + 40) / 200
                    const angle = (index + 40) * GOLDEN_ANGLE
                    const rad = ratio * -8
                    const x = Math.cos(angle) * rad
                    const y = Math.sin(angle) * rad
                    const z = index * -0.1

                    return (
                        <motion.mesh
                            key={mesh}
                            initial={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0 }}
                            animate={{ opacity: 1, x, y, z, scale: 1 }}
                            exit={{ opacity: 0, x: 0, y: 0, z: 0, scale: 0 }}
                            transition={{
                                duration: 1,
                            }}
                        >
                            {orbit ? (
                                <meshPhongMaterial attach="material" />
                            ) : (
                                <meshBasicMaterial attach="material" />
                            )}
                            <sphereBufferGeometry
                                attach="geometry"
                                args={[0.1, 12, 12]}
                            />
                        </motion.mesh>
                    )
                })}
            </AnimatePresence>
            {orbit && <OrbitControls />}
        </Canvas>
    )
}
