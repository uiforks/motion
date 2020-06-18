import { createElement } from "react"
import { MotionProps } from "../../motion/types"
import { filterProps } from "../dom/utils/filter-props"

export function buildThreeProps(visualElement: any) {
    return {
        ...visualElement.attrs,
        style: { ...visualElement.reactStyle },
    }
}

export function render<Props>(
    Component: string | React.ComponentType<Props>,
    props: MotionProps,
    visualElement: any
) {
    // Only filter props from components we control, ie `motion.div`. If this
    // is a custom component pass along everything provided to it.
    const forwardedProps =
        typeof Component === "string" ? filterProps(props) : props

    /**
     * Every render, empty and rebuild the animated values to be applied to our Element.
     * During animation these data structures are used in a mutable fashion to reduce
     * garbage collection, but between renders we can flush them to remove values
     * that might have been taken out of the provided props.
     */
    visualElement.clean()
    visualElement.build()

    // Generate props to visually render this component
    // const visualProps = buildThreeProps(visualElement as any)

    return createElement<any>(Component, {
        ...forwardedProps,
        ref: visualElement.ref,
        // ...visualProps,
    })
}
