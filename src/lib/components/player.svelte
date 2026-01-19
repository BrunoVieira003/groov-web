<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatSongTime } from "$lib/formatters/songTime";
    import PlayButton from "./play-button.svelte";
    import { songQueue } from "$lib/stores/queue";
    import { currentSong } from "$lib/stores/currentSong";

    let audio: HTMLAudioElement;
    let source = $state<HTMLSourceElement>();

    let currentTime = $state(0);
    let duration = $state(0);

    let progress = $derived(() => {
        if (!$currentSong || !duration) {
            return 0;
        }

        return Math.floor((currentTime / duration) * 100);
    });

    currentSong.subscribe((song) => {
        if (source) {
            source.src = `${PUBLIC_API_URL}/song/${song?.id}`;
            audio.load();
        }
    });

    function handleTrackEnd(){
        songQueue.nextTrack()
    }

</script>

<div class="fixed text-white flex items-center justify-evenly w-full gap-20 px-20 py-10 bg h-10 bottom-0 bg-gray-800">
    <audio
    class="hidden"
    bind:this={audio}
    bind:currentTime
    bind:duration
    bind:paused={$songQueue.paused}
    autoplay
    onended={handleTrackEnd}
    >
        <source bind:this={source}/>
    </audio>

    <div class="w-1/5 line-clamp-1">
        <p>{$currentSong?.title}</p>
        <div class="flex gap-1">
            {#each $currentSong?.authors as author}
                <a class="text-xs hover:underline not-last:after:content-[',']" href="/artists/{author.artist.id}">{author.artist.name}</a>
            {/each}
        </div>
    </div>
    
    <div class="grow flex flex-col items-center gap-2 justify-stretch">
        <div class="flex items-center justify-between w-full gap-2">
            <p class="w-fit text-nowrap text-xs">{formatSongTime(currentTime, !!$currentSong)}</p>
            <div class="flex items-center gap-2">
                <PlayButton paused={$songQueue.paused} onclick={() => {songQueue.togglePlay()}}/>
            </div>
            <p class="w-fit text-nowrap text-xs">{formatSongTime(duration, !!$currentSong)}</p>
        </div>

        <div class="slider w-4/5 h-fit">
            <input
            bind:value={currentTime}
            min="0"
            max={duration}
            class="range-slider bg-gray-500"
            type="range"
            step="0.01"
            />
            
            <div
            class="progress bg-gray-200"
            style="width: {progress()}%;"
            >
            </div>
        
            <div
            class="slider-thumb bg-gray-200"
            style="left: calc({progress()}% - 0.5rem);"
            >
            </div>

        </div>
    </div>

    
    <div class="w-1/5">
        <p>{$currentSong?.year}</p>
    </div>
</div>
