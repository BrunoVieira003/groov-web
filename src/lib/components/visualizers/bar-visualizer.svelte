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

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyser.getByteFrequencyData(dataArray)
        
        animationId = requestAnimationFrame(draw)

        const width = canvas.width
        const height = canvas.height
        
        ctx.clearRect(0, 0, width, height)
        
        const avgAmount = 16
        const gap = avgAmount / 2
        const maxIndex = Math.floor((16000 * analyser.fftSize) / analyser.context.sampleRate)
        const totalBars = Math.floor(maxIndex / avgAmount)
        const barWidth = (width / totalBars ) - gap

        
        let x = 0

        for (let i = 0; i < totalBars; i++) {

            let total = 0
            for (let j = 0; j < avgAmount; j++){
                total += dataArray[(i * avgAmount) + j]
            }

            const barValue = total / avgAmount

            drawBarStrategies[$audioVisualizer](ctx, x, barWidth, barValue)
            
            x += barWidth + gap
        }

        ctx.fillStyle = $currentSong?.color ?? '#383838'
        ctx.fill()
    }

    function drawBarBottom(ctx: CanvasRenderingContext2D, x: number, width: number, value: number){
        const canva = ctx.canvas
        const maxHeight = canva.height
        const barHeight = (value / 255) * maxHeight
        ctx.roundRect(x, maxHeight - barHeight, width, barHeight, [8,8,0,0])
    }

    function drawBarMiddle(ctx: CanvasRenderingContext2D, x: number, width: number, value: number){
        const canva = ctx.canvas
        const baseHeight = Math.floor(canva.height / 2)
        const barHeight = (value / 255) * canva.height
        ctx.roundRect(x, baseHeight - barHeight/2, width, barHeight, 8)
    }

    function drawBarTop(ctx: CanvasRenderingContext2D, x: number, width: number, value: number){
        const canva = ctx.canvas
        const maxHeight = canva.height
        const barHeight = (value / 255) * maxHeight
        ctx.roundRect(x, 0, width, barHeight, [0,0,8,8])
    }
</script>


<canvas bind:this={canvas} class="size-full overflow-x-scroll">
</canvas>