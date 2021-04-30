/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import * as React from "react"
import * as THREE from "three"
import { useState } from "react"
import { AnimatePresence } from "@framer"
import { Canvas, ThreeEvent, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { motion } from "../../src/render/three/motion"
import { useSpring } from "../../src"

type Object3DWithStandardMaterial = THREE.Object3D & {
    material: THREE.MeshStandardMaterial
}

const GRID_SIZE = 3
const COLOR = [
    "#06f",
    "#09f",
    "#0c8",
    "#9c2",
    "#fb0",
    "#f81",
    "#e14",
    "#e4b",
    "#85f",
]
const COLORS = [...COLOR, ...COLOR, ...COLOR]

function getGridPosition(index: number, size: number, factor: number) {
    const row = Math.floor(index / size)
    const column = index % size

    return [(row - size / 2) * factor, (column - size / 2) * factor]
}

function createVariants(index = 0) {
    return {
        big: {
            scale: 1.6,
            rotateX: 0,
            rotateY: 0,
            color: COLORS[index],
        },
        small: {
            scale: 1,
            rotateX: 1,
            rotateY: 1,
            opacity: 1,
            color: COLORS[index + 1],
        },
        med: {
            scale: 1.3,
            rotateX: 0.2,
            rotateY: 0.2,
            opacity: 1,
            color: COLORS[index + 2],
        },
        gone: {
            scale: 0,
            rotateX: -1,
            rotateY: -1,
            opacity: 0,
            color: "#fff",
            transition: { duration: 1, type: "spring", bounce: 0.3 },
        },
    }
}

const variants = [...Array(1 + GRID_SIZE * GRID_SIZE).keys()].map(
    createVariants
)

function Cursor() {
    const gltf = useLoader(GLTFLoader, "/static/cursor.gltf")
    const gltfWithColor = React.useMemo(() => {
        const cursor = gltf.scene.getObjectByName(
            "Cursor"
        ) as Object3DWithStandardMaterial
        const arrow = gltf.scene.getObjectByName(
            "Arrow"
        ) as Object3DWithStandardMaterial
        const label = gltf.scene.getObjectByName(
            "Label"
        ) as Object3DWithStandardMaterial

        cursor.material.metalness = 0
        arrow.material.metalness = 0
        label.material.metalness = 0

        cursor.material.color = new THREE.Color("#06f").convertSRGBToLinear()
        arrow.material.color = new THREE.Color("#06f").convertSRGBToLinear()
        label.material.color = new THREE.Color("#fff").convertSRGBToLinear()

        return gltf
    }, [gltf])

    return <primitive object={gltfWithColor.scene} />
}

const spring = {
    stiffness: 520,
    damping: 30,
    restDelta: 0.0001,
    restSpeed: 0.0001,
}

const liStyle: React.CSSProperties = {
    fontFamily: "system-ui, -apple-system",
    listStyle: "none",
    margin: "0.4em 0",
    userSelect: "none",
    fontWeight: 500,
}

const emojiStyle: React.CSSProperties = {
    fontSize: "0.8em",
    marginRight: "0.6em",
}

export const App = () => {
    const [show, setShow] = useState(true)
    const scale = useSpring(0.6, spring)
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)
    const z = useSpring(2, spring)

    const handlePointerMove = React.useCallback(
        (event: ThreeEvent<PointerEvent>) => {
            x.set(event.point.x - 0.32)
            y.set(event.point.y - 0.03)
            z.set(event.point.z)
        },
        [x, y, z]
    )

    const handlePointerDown = React.useCallback(() => {
        scale.set(0.56)
    }, [scale])

    const handlePointerUp = React.useCallback(() => {
        scale.set(0.6)
    }, [scale])

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "#fff",
                cursor: "none",
            }}
        >
            <div
                style={{
                    position: "fixed",
                    top: 20,
                    left: 20,
                    padding: "30px 32px",
                    borderRadius: 20,
                    background: "#f6f6f6",
                    transformOrigin: "top left",
                    transform: "scale(0.7)",
                }}
            >
                <ul style={{ margin: 0, padding: 0 }}>
                    <li style={liStyle}>
                        <span style={emojiStyle}>✅</span> Animations through{" "}
                        <code>animate</code>.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>✅</span> Variants.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>✅</span> Gestures (e.g.{" "}
                        <code>whileHover</code> and <code>whileTap</code>.).
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>✅</span> Mount/unmount
                        animations through <code>AnimatePresence</code>.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>✅</span> Orchestration through{" "}
                        <code>staggerChildren</code>.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>✅</span> MotionValues.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>🚧</span> Shipping a 0.1.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>🚧</span> …
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>🚧</span> Drag.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>🚧</span> Shaders and other
                        material primitives.
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>🚧</span> …
                    </li>
                    <li style={liStyle}>
                        <span style={emojiStyle}>🚧</span> Shipping a 1.0.
                    </li>
                </ul>
            </div>
            <Canvas
                camera={{ fov: 60 }}
                style={{ width: "100vw", height: "100vh" }}
            >
                <ambientLight intensity={1} color="#fff" />
                <mesh
                    position={[0, 0, 2]}
                    onPointerMove={handlePointerMove}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                >
                    <meshStandardMaterial
                        attach="material"
                        opacity={0}
                        transparent
                    />
                    <planeBufferGeometry attach="geometry" args={[16, 16]} />
                </mesh>
                <motion.group
                    position={[x, y, z] as any}
                    scale={[scale, scale, scale] as any}
                >
                    <group position={[0.5, -0.5, 0]}>
                        <pointLight
                            position={[0.5, 2, 1]}
                            intensity={1}
                            color="#fff"
                        />
                        <pointLight
                            position={[0.5, 0, -0.1]}
                            intensity={1}
                            color="#fff"
                        />
                        <React.Suspense fallback={null}>
                            <Cursor />
                        </React.Suspense>
                    </group>
                </motion.group>
                <motion.group position={[2, 0, 0]}>
                    <motion.group
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <mesh onClick={() => setShow(!show)}>
                            <meshStandardMaterial attach="material" />
                            <boxBufferGeometry
                                attach="geometry"
                                args={[1, 1, 1]}
                            />
                        </mesh>
                    </motion.group>
                </motion.group>
                <AnimatePresence>
                    {show && (
                        <>
                            <motion.group>
                                <motion.mesh
                                    variants={variants[0]}
                                    initial={"gone"}
                                    exit={"gone"}
                                    animate={"small"}
                                    whileHover={"big"}
                                    whileTap={"med"}
                                    transition={{
                                        duration: 0.5,
                                        type: "spring",
                                        bounce: 0.3,
                                    }}
                                >
                                    <meshStandardMaterial attach="material" />
                                    <boxBufferGeometry
                                        attach="geometry"
                                        args={[1, 1, 1]}
                                    />
                                </motion.mesh>
                            </motion.group>
                            <motion.group
                                position={[-2, 0, 0]}
                                rotation={[0, 0, -Math.PI / 2]}
                                transition={{
                                    staggerChildren: 0.1,
                                }}
                                initial={"gone"}
                                exit={"gone"}
                                animate={"small"}
                            >
                                {[...Array(GRID_SIZE * GRID_SIZE).keys()].map(
                                    (index) => {
                                        const [i, j] = getGridPosition(
                                            index,
                                            GRID_SIZE,
                                            0.5
                                        )

                                        return (
                                            <motion.mesh
                                                key={index}
                                                variants={variants[1 + index]}
                                                position={[
                                                    i + 0.25,
                                                    j + 0.25,
                                                    0,
                                                ]}
                                                transition={{
                                                    duration: 0.5,
                                                    type: "spring",
                                                    bounce: 0.3,
                                                }}
                                            >
                                                <meshStandardMaterial attach="material" />
                                                <boxBufferGeometry
                                                    attach="geometry"
                                                    args={[0.2, 0.2, 0.2]}
                                                />
                                            </motion.mesh>
                                        )
                                    }
                                )}
                            </motion.group>
                        </>
                    )}
                </AnimatePresence>
            </Canvas>
        </div>
    )
}
