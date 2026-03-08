<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatSongTime } from "$lib/formatters/songTime";
    import PlayButton from "./play-button.svelte";
    import { songQueue } from "$lib/stores/queue";
    import { currentSong } from "$lib/stores/currentSong";
    import nextIcon from '$lib/assets/icons/next.svg'
    import previousIcon from '$lib/assets/icons/previous.svg'
    import emptyImage from '$lib/assets/images/empty.png'
    import ArtistsLabel from "./artists-label.svelte";
    import { currentTime, duration } from "$lib/stores/audioState";

    let coverImage: HTMLImageElement

    let progress = $derived(() => {
        if (!$currentSong || !duration) {
            return 0;
        }

        return Math.floor(($currentTime / $duration) * 100);
    });

    let coverArtURL = $derived(() => `${PUBLIC_API_URL}/songs/${$currentSong?.id}/cover`)

    if(navigator.mediaSession){
        navigator.mediaSession.setActionHandler('pause', songQueue.togglePlay)
        navigator.mediaSession.setActionHandler('nexttrack', songQueue.nextTrack)
        navigator.mediaSession.setActionHandler('previoustrack', songQueue.previousTrack)
        navigator.mediaSession.setActionHandler('seekto', ({seekTime}) => {
            if(seekTime){
                $currentTime = seekTime
            }
        })
    }

</script>

<div class="fixed text-white flex items-center justify-evenly w-full px-20 py-10 bg h-10 bottom-0 bg-gray-800" style="--colorful: {$currentSong?.color};">

    <div class="w-1/4 flex items-center gap-4">
        <img
        bind:this={coverImage}
        src={coverArtURL()}
        alt="cover_art"
        class="size-16 aspect-square rounded object-cover"
        onerror={() => coverImage.src = emptyImage}
        >
        <div>
            <a class="colorful font-bold text-md w-fit hover:cursor-pointer hover:underline line-clamp-1" href="/playing">{$currentSong?.title}</a>
            <ArtistsLabel artists={$currentSong?.authors || []} size='small'/>
        </div>
    </div>
    
    <div class="flex flex-col w-2/4 items-center gap-2 justify-center">
        <div class="flex items-center justify-between w-full gap-2">
            <p class="w-fit text-nowrap text-xs">{formatSongTime($currentTime, !!$currentSong)}</p>
            <div class="flex items-center gap-2">
                <button onclick={songQueue.previousTrack}>
                    <img 
                    src={previousIcon} 
                    alt="previous_track" 
                    class="size-5 data-[enabled=false]:opacity-20" 
                    data-enabled={$songQueue.currentIndex !== 0}
                    >
                </button>

                <PlayButton paused={$songQueue.paused} onclick={songQueue.togglePlay}/>

                <button onclick={songQueue.nextTrack}>
                    <img 
                    src={nextIcon}
                    alt="next_track" 
                    class="size-5 data-[enabled=false]:opacity-20" 
                    data-enabled={$songQueue.currentIndex !== $songQueue.tracks.length - 1}
                    >
                </button>
            </div>
            <p class="w-fit text-nowrap text-xs">{formatSongTime($duration, !!$currentSong)}</p>
        </div>

        <div class="slider w-4/5 h-fit">
            <input
            bind:value={$currentTime}
            min="0"
            max={$duration}
            class="range-slider bg-gray-500"
            type="range"
            step="0.01"
            />
            
            <div
            class="progress bg-gray-200 transition-all duration-50"
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

    
    <div class="w-1/4 flex justify-center">
        <p>{$currentSong?.year}</p>
    </div>
</div>


<style>
    .colorful{
        color: var(--colorful);
    }
</style>
