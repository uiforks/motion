import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence, AnimateSharedLayout } from "@framer"
import styled from "styled-components"

/**
 * This demonstrates container components correctly animating
 * resize when children are added/removed/expanded
 */

interface ItemProps {}

const ContentRow = styled(motion.div)`
    width: 200px;
    height: 8px;
    background-color: #999;
    border-radius: 10px;
    margin-top: 12px;
`
const List = styled(motion.div)`
    width: 240px;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 20px;
    border-radius: 25px;
`

const Container = styled(motion.div)`
    background-color: rgba(214, 214, 214, 0.5);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    width: 200px;

    &:last-child {
        margin-bottom: 0px;
    }

    &[data-is-dragging="true"] {
        position: absolute;
    }
`

const Image = styled(motion.div)`
    width: 40px;
    height: 40px;
    background-color: #666;
    border-radius: 20px;
`

function Item({}: ItemProps) {
    const [isDragging, setIsDragging] = useState(false)

    return (
        <Container
            layout
            drag
            id="container"
            onDragStart={() => setTimeout(() => setIsDragging(true), 200)}
            onDragEnd={() => setIsDragging(false)}
            data-is-dragging={isDragging}
        >
            <Image id="image" />
        </Container>
    )
}

const Component = () => {
    return (
        <List initial={{ borderRadius: 25 }} layout>
            {items.map((id) => (
                <Item key={id} />
            ))}
        </List>
    )
}

const items = [0, 1, 2]
export const App = () => {
    return (
        <AnimateSharedLayout>
            <Component />
        </AnimateSharedLayout>
    )
}
