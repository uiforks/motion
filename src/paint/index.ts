export function addPaintWorket(url: string) {
    if ("paintWorklet" in CSS) {
        ;(CSS as any).paintWorklet.addModule(url)
    }
}
