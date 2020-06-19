import * as React from "react"
import { useState, Suspense } from "react"
import { motion } from "../../src/render/three"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"
import { useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

function Asset({ url }) {
    const [hovered, setHover] = useState(true)
    const gltf = useLoader(GLTFLoader, url)
    return (
        <motion.group
            scale={4}
            y={-2.5}
            animate={{
                scale: hovered ? 6 : 4,
                y: hovered ? -4 : -2.5,
            }}
            transition={{ duration: 0.2 }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <primitive object={gltf.scene} dispose={null} />
        </motion.group>
    )
}

export const App = () => {
    return (
        <Canvas
            colorManagement
            style={{ width: "100vw", height: "100vh" }}
            pixelRatio={window.devicePixelRatio}
            gl={{ alpha: false }}
            camera={{ position: [0, 0, 10], near: 0.1, far: 200 }}
            onCreated={({ gl }) => gl.setClearColor("#9966ff")}
        >
            <ambientLight />
            <pointLight position={[150, 150, 150]} intensity={0.55} />

            <Suspense fallback={null}>
                <Asset url="/framerLogo.gltf" />
            </Suspense>

            <OrbitControls />
        </Canvas>
    )
}
