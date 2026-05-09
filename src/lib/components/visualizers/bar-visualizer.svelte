<script lang="ts">
    import { currentSong, getAudioAnalyzer, paused } from "$lib/stores/player";

    interface PropsType{
        audio: HTMLAudioElement
    }

    let canvas = $state<HTMLCanvasElement>()
    let { audio, ...rest }: PropsType = $props()

    let audioContext: AudioContext
    let analyser: AnalyserNode | null
    let animationId: number

    $effect(() => {
        if($paused){
            cancelAnimationFrame(animationId);
        }else{
            analyser = getAudioAnalyzer()
            if(analyser){
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
        console.log('width', width)
        
        ctx.clearRect(0, 0, width, height)
        
        const avgAmount = 8
        const maxIndex = Math.floor((16000 * analyser.fftSize) / analyser.context.sampleRate)
        const totalBars = Math.floor(maxIndex / avgAmount)
        const barWidth = (width / totalBars ) - 1
        let barHeight

        let x = 0;
        for (let i = 0; i < totalBars; i++) {

            let total = 0
            for (let j = 0; j < avgAmount; j++){
                total += dataArray[(i * avgAmount) + j]
            }

            const barValue = total / avgAmount

            barHeight = (barValue / 255) * height; // 0-255

            ctx.fillStyle = $currentSong?.color ?? '#f0f0f0'
            
            ctx.fillRect(x, height - barHeight, barWidth, barHeight)

            x += barWidth + 1
        }
    }
</script>


<canvas bind:this={canvas} class="size-full overflow-x-scroll">
</canvas>