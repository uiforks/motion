// import * as THREE from "three"
// import { createMotionComponent } from "../../motion"
// import { createThreeMotionConfig } from "./create-three-config"

// export const motion = Object.keys(THREE).reduce((components, key) => {
//     const lowercaseKey = key[0].toLowerCase() + key.substring(1)
//     components[lowercaseKey] = createMotionComponent(
//         createThreeMotionConfig(lowercaseKey)
//     )
//     return components
// }, {})

// const config: MotionComponentConfig<HTMLElement | SVGElement> = {
//     useVisualElement: useThreeVisualElement,
//     render: render,
//     animationControlsConfig: {},
// }

// // This just caches generated components
// const componentCache = new Map<string, any>()

// export const motion = new Proxy({}, {
//   get: (target, key) {
//     if (!componentCache.has(key)) {
//         componentCache.set(key, createMotionComponent(key, config))
//     }
//     return componentCache.get(key)
// }
// })
