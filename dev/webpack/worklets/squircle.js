registerPaint(
    "squircle",
    class {
        static get inputProperties() {
            return ["--squircle-radius", "--squircle-color"]
        }

        static get inputArguments() {
            return ["<length>"]
        }

        paint(ctx, { width, height }, styles) {
            const radius = styles.get("--squircle-radius")?.value || 0
            const PI = Math.PI
            const TAU = PI * 2
            const edge = width // SIZE OF THE CANVAS IN PIXELS
            const dim = edge / 2
            const r = dim * 0.9
            const maxWidthRadius = Math.min(radius, width / 2)
            const maxHeightRadius = Math.min(radius, height / 2)

            const n = 4
            function coord(t) {
                const power = 2 / n
                const c = Math.cos(t),
                    x = Math.pow(Math.abs(c), power) * Math.sign(c)
                const s = Math.sin(t),
                    y = Math.pow(Math.abs(s), power) * Math.sign(s)
                return { x, y }
            }

            function drawSegmentTo(ctx, t) {
                const c = coord(t)
                const cx = dim + r * c.x // Here, dim is our canvas "radius",
                const cy = dim + r * c.y // and r is our circle radius, with
                ctx.lineTo(cx, cy) // ctx being our canvas context.

                // stroke segment in rainbow colours
                const h = (360 * t) / TAU
                ctx.strokeStyle = `hsl(${h}, 100%, 50%)`
                ctx.stroke()

                // start a new segment at the end point
                ctx.beginPath()
                ctx.moveTo(cx, cy)
            }

            ctx.fillStyle = styles.get("--squircle-color")

            // THIS DETERMINES HOW SMOOTH OF A CURVE GETS DRAWN
            const segments = 32

            // Peg our starting point, which we know is (r,0) away from the center.
            ctx.beginPath()
            ctx.moveTo(dim + r, dim)

            // Then we generate all the line segments on the path
            for (let step = TAU / segments, t = step; t <= TAU; t += step)
                drawSegmentTo(ctx, t)

            // And because IEEE floats are imprecise, the last segment may not
            // actually reach our starting point. As such, make sure to draw it!
            ctx.lineTo(dim + r, dim)
            ctx.stroke()
        }
    }
)
