import * as React from "react"
import { motion } from "@framer"

if (CSS.paintWorklet) {
    CSS.registerProperty({
        name: "--squircle-radius",
        syntax: "<number>",
        initialValue: 0,
        inherits: false,
    })
    CSS.registerProperty({
        name: "--squircle-color",
        syntax: "<color>",
        initialValue: "black",
        inherits: false,
    })
    CSS.paintWorklet.addModule("worklets/squircle.js")
}

/**
 * An example of animating the filter property.
 */

const style = {
    width: 100,
    height: 100,
    background: "paint(squircle)",
    "--squircle-radius": 10,
    "--squircle-color": "#09f",
    color: "pink",
}

export const App = () => {
    return (
        <div style={stretch}>
            <motion.div
                initial={{ "--squircle-radius": 0 }}
                animate={{ "--squircle-radius": 10 }}
                transition={{ duration: 2 }}
                style={style}
            />
        </div>
    )
}

const stretch = {
    position: "fixed",
    background: "white",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}
