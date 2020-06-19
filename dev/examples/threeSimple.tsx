import * as React from "react"
import * as THREE from "three"
import { useCallback, useState, useEffect, Suspense } from "react"
import { motion } from "../../src/render/three"
import { AnimatePresence } from "@framer"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"
import { Asset } from "./framerLogo"

const GOLDEN_RATIO = (Math.sqrt(5) + 1) / 2 - 1
const GOLDEN_ANGLE = GOLDEN_RATIO * (2 * Math.PI)

const primitives = [
    <sphereBufferGeometry attach="geometry" args={[0.1, 16, 16]} />,
    <coneBufferGeometry attach="geometry" args={[0.1, 0.1, 16]} />,
    <icosahedronBufferGeometry attach="geometry" args={[0.1]} />,
    <octahedronBufferGeometry attach="geometry" args={[0.1]} />,
    <boxBufferGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />,
    <torusBufferGeometry attach="geometry" args={[0.1, 0.02, 12, 16]} />,
    <torusKnotBufferGeometry attach="geometry" args={[0.1, 0.02, 42, 16]} />,
]

export const App = () => {
    const [meshes, setMeshes] = useState(Array.from(Array(40).keys()))
    const [showMeshes, setShowMeshes] = useState(false)
    const [hover, setHover] = useState(false)
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

    const handleKey = useCallback((event: KeyboardEvent) => {
        if (event.key === "q") {
            setShowMeshes(latestShowMeshes => !latestShowMeshes)
        }

        if (event.key === "w") {
            setMeshes(latestMeshes => {
                latestMeshes.shift()

                return [...latestMeshes]
            })
        }

        if (event.key === "e") {
            setOrbit(latestOrbit => !latestOrbit)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKey)

        return () => {
            window.removeEventListener("keydown", handleKey)
        }
    }, [handleKey])

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
            <motion.mesh
                initial={{ x: 0, scale: 1 }}
                animate={{ x: 0, scale: hover ? 1.3 : 1 }}
                onClick={handleAdd}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {orbit ? (
                    <meshPhongMaterial attach="material" />
                ) : (
                    <meshBasicMaterial attach="material" />
                )}
                <sphereBufferGeometry attach="geometry" args={[0.6, 32, 32]} />
            </motion.mesh>
            <AnimatePresence>
                {showMeshes &&
                    meshes.map((mesh, index) => {
                        const ratio = (index + 40) / 200
                        const angle = (index + 40) * GOLDEN_ANGLE
                        const rad = ratio * -8
                        const x = Math.cos(angle) * rad
                        const y = Math.sin(angle) * rad
                        const z = index * -0.1

                        return (
                            <motion.mesh
                                key={mesh}
                                initial={{
                                    opacity: 0,
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    scale: 0,
                                }}
                                animate={{ opacity: 1, x, y, z, scale: 1 }}
                                exit={{
                                    opacity: 0,
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                    scale: 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 40,
                                    damping: 40,
                                }}
                            >
                                {orbit ? (
                                    <meshPhongMaterial attach="material" />
                                ) : (
                                    <meshBasicMaterial attach="material" />
                                )}
                                {orbit ? (
                                    primitives[mesh % primitives.length]
                                ) : (
                                    <sphereBufferGeometry
                                        attach="geometry"
                                        args={[0.1, 32, 32]}
                                    />
                                )}
                            </motion.mesh>
                        )
                    })}
            </AnimatePresence>
            {orbit && <OrbitControls />}
        </Canvas>
    )
}
