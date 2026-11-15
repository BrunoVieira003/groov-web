<script lang="ts">
    import { currentSong, getAudioAnalyzer, paused } from "$lib/stores/player";
    import { audioVisualizer, type AudioVisualizerOptions } from "$lib/stores/settings";

    interface PropsType{
        audio: HTMLAudioElement
    }

    type DrawBar = (ctx: CanvasRenderingContext2D, x: number, width: number, value: number, height: number) => void

    let canvas = $state<HTMLCanvasElement>()
    let { audio }: PropsType = $props()

    let analyser: AnalyserNode | null = null
    let dataArray: Uint8Array<ArrayBuffer> = new Uint8Array(0)
    let animationId: number | null = null

    // canvas size in CSS pixels, kept in sync by the ResizeObserver
    let cssWidth = 0
    let cssHeight = 0

    const avgAmount = 8
    const gap = avgAmount / 2

    const drawBarStrategies: Record<AudioVisualizerOptions, DrawBar> = {
        'disabled': () => {},
        'bottom': drawBarBottom,
        'middle': drawBarMiddle,
        'top': drawBarTop,
    }

    $effect(() => {
        const mode = $audioVisualizer

        if ($paused || mode === 'disabled') {
            stop()
            if (mode === 'disabled') clear()
            return
        }

        analyser = getAudioAnalyzer()
        if (!analyser) return

        analyser.fftSize = 1024
        analyser.smoothingTimeConstant = 0.9
        dataArray = new Uint8Array(analyser.frequencyBinCount)

        start()

        // runs before the effect re-runs (pause, mode change) and on unmount,
        // so there is never more than one animation loop alive
        return stop
    })

    $effect(() => {
        if (!canvas) return

        const observer = new ResizeObserver(resize)
        observer.observe(canvas)
        resize()

        return () => observer.disconnect()
    })

    function resize() {
        if (!canvas) return

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        cssWidth = rect.width
        cssHeight = rect.height

        // changing width/height resets the context, so only do it when the size actually changed
        const width = Math.round(cssWidth * dpr)
        const height = Math.round(cssHeight * dpr)
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
        }

        canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function start() {
        if (animationId === null) {
            animationId = requestAnimationFrame(draw)
        }
    }

    function stop() {
        if (animationId !== null) {
            cancelAnimationFrame(animationId)
            animationId = null
        }
    }

    function clear() {
        const ctx = canvas?.getContext('2d')
        ctx?.clearRect(0, 0, cssWidth, cssHeight)
    }

    function draw() {
        animationId = requestAnimationFrame(draw)

        if (!canvas || !analyser) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        analyser.getByteFrequencyData(dataArray)

        ctx.clearRect(0, 0, cssWidth, cssHeight)

        const bufferLength = dataArray.length
        const maxIndex = Math.min(
            bufferLength,
            Math.floor((25000 * analyser.fftSize) / analyser.context.sampleRate),
        )
        const totalBars = Math.floor(maxIndex / avgAmount)
        if (totalBars === 0) return

        const barWidth = (cssWidth / totalBars) - gap
        const drawBar = drawBarStrategies[$audioVisualizer]

        // a fresh path every frame, otherwise every bar ever drawn is kept and re-filled
        ctx.beginPath()

        let x = 0
        for (let i = 0; i < totalBars; i++) {
            const barValue = (dataArray[i] * 100) / 255
            drawBar(ctx, x, barWidth, barValue, cssHeight)
            x += barWidth + gap
        }

        ctx.fillStyle = $currentSong?.colors.vibrant ?? '#383838'
        ctx.fill()
    }

    function drawBarBottom(ctx: CanvasRenderingContext2D, x: number, width: number, value: number, height: number){
        const barHeight = (value * height) / 100
        ctx.roundRect(x, height - barHeight, width, barHeight, [8,8,0,0])
    }

    function drawBarMiddle(ctx: CanvasRenderingContext2D, x: number, width: number, value: number, height: number){
        const baseHeight = Math.floor(height / 2)
        const barHeight = (value * height) / 100
        ctx.roundRect(x, baseHeight - barHeight/2, width, barHeight, 8)
    }

    function drawBarTop(ctx: CanvasRenderingContext2D, x: number, width: number, value: number, height: number){
        const barHeight = (value * height) / 100
        ctx.roundRect(x, 0, width, barHeight, [0,0,8,8])
    }
</script>


<canvas bind:this={canvas} class="size-full overflow-x-scroll">
</canvas>
