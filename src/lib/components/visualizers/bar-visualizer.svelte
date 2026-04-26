<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { currentSong, paused } from "$lib/stores/player";

    interface PropsType{
        audio: HTMLAudioElement
    }

    let canvas = $state<HTMLCanvasElement>()
    let { audio, ...rest }: PropsType = $props()

    let audioContext: AudioContext
    let analyser: AnalyserNode
    let animationId: number

    $effect(() => {
        if($paused){
            cancelAnimationFrame(animationId);
        }else{
            initVisualizer()
        }
    })

    function initVisualizer(){
        if(!audioContext){
            audioContext = new window.AudioContext

            analyser = audioContext.createAnalyser()
            if(audio){
                const audioSource = audioContext.createMediaElementSource(audio)
                audioSource.connect(analyser)
                analyser.connect(audioContext.destination)
            }
        }


        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        draw()
    }

    function draw() {
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr)

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    
    animationId = requestAnimationFrame(draw);

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height)

    const barWidth = (width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * height; // 0-255

      ctx.fillStyle = $currentSong?.color ?? '#fff';
      
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 1; 
    }
  }
</script>


<canvas bind:this={canvas} class="size-full">
</canvas>