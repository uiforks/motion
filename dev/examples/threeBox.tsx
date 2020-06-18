import * as React from "react"
import { Canvas, useFrame } from "react-three-fiber"

function Box(props) {
    const mesh = React.useRef()
    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)

    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={e => setActive(!active)}
            onPointerOver={e => setHover(true)}
            onPointerOut={e => setHover(false)}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial
                attach="material"
                color={hovered ? "hotpink" : "orange"}
            />
        </mesh>
    )
}

export const App = () => {
    return (
        <Canvas colorManagement>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}
