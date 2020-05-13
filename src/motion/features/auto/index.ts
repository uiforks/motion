import { SharedLayoutContextProvider } from "./Auto"
import { MotionFeature } from "../types"
import { MotionProps } from "../../types"

export const Auto: MotionFeature = {
    key: "auto",
    shouldRender: ({ animate, layoutId, exit }: MotionProps) => {
        const hasAutoAnimateProps =
            typeof animate === "boolean" || layoutId !== undefined
        return (
            (hasAutoAnimateProps || exit !== undefined) &&
            typeof window !== "undefined"
        )
    },
    Component: SharedLayoutContextProvider,
}
