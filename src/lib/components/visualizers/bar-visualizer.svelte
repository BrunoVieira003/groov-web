<script lang="ts">
    import { currentSong, getAudioAnalyzer, paused } from "$lib/stores/player";
    import { audioVisualizer, type AudioVisualizerOptions } from "$lib/stores/settings";

    interface PropsType{
        audio: HTMLAudioElement
    }

    let canvas = $state<HTMLCanvasElement>()
    let { audio }: PropsType = $props()

    let audioContext: AudioContext
    let analyser: AnalyserNode | null
    let animationId: number

    const drawBarStrategies: Record<AudioVisualizerOptions, Function> = {
        'disabled': () => {},
        'bottom': drawBarBottom,
        'middle': drawBarMiddle,
        'top': drawBarTop,
    }

    $effect(() => {
        if($paused){
            cancelAnimationFrame(animationId);
        }else{
            analyser = getAudioAnalyzer()
            if(analyser && $audioVisualizer !== 'disabled'){
                draw()
            }
        }
    })

    function draw() {
        if (!canvas || !analyser) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1
        
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)

        analyser.fftSize = 1024
        analyser.smoothingTimeConstant = 0.9

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyser.getByteFrequencyData(dataArray)
        
        animationId = requestAnimationFrame(draw)

        const width = canvas.width
        const height = canvas.height
        
        ctx.clearRect(0, 0, width, height)
        
        const avgAmount = 8
        const gap = avgAmount / 2
        const maxIndex = Math.floor((25000 * analyser.fftSize) / analyser.context.sampleRate)
        const totalBars = Math.floor(maxIndex / avgAmount)
        const barWidth = (width / totalBars ) - gap

        
        let x = 0

        for (let i = 0; i < bufferLength; i++) {

            const barValue = (dataArray[i] * 100) / 255

            drawBarStrategies[$audioVisualizer](ctx, x, barWidth, barValue)
            
            x += barWidth + gap
        }

        ctx.fillStyle = $currentSong?.color ?? '#383838'
        ctx.fill()
    }

    function drawBarBottom(ctx: CanvasRenderingContext2D, x: number, width: number, value: number){
        const canva = ctx.canvas
        const maxHeight = canva.height
        const barHeight = (value * canva.height) / 100
        ctx.roundRect(x, maxHeight - barHeight, width, barHeight, [8,8,0,0])
    }

    function drawBarMiddle(ctx: CanvasRenderingContext2D, x: number, width: number, value: number){
        const canva = ctx.canvas
        const baseHeight = Math.floor(canva.height / 2)
        const barHeight = (value * canva.height) / 100
        ctx.roundRect(x, baseHeight - barHeight/2, width, barHeight, 8)
    }

    function drawBarTop(ctx: CanvasRenderingContext2D, x: number, width: number, value: number){
        const canva = ctx.canvas
        const maxHeight = canva.height
        const barHeight = (value * maxHeight) / 100
        ctx.roundRect(x, 0, width, barHeight, [0,0,8,8])
    }
</script>


<canvas bind:this={canvas} class="size-full overflow-x-scroll">
</canvas>