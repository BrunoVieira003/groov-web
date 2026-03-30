<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatSongTime } from "$lib/formatters/songTime";
    import PlayButton from "./buttons/play-button.svelte";
    import { songQueue } from "$lib/stores/queue";
    import { currentSong } from "$lib/stores/currentSong";
    import emptyImage from '$lib/assets/images/empty.png'
    import ArtistsLabel from "../artists-label.svelte";
    import { currentTime, duration } from "$lib/stores/audioState";
    import PreviousButton from "./buttons/previous-button.svelte";
    import NextButton from "./buttons/next-button.svelte";
    import ToggleViewButton from "./buttons/toggle-view-button.svelte";
    import ProgressBar from "../progress-bar.svelte";
    import ModeButton from "./buttons/mode-button.svelte";

    let coverImage: HTMLImageElement

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

<div class="text-white flex items-center justify-center lg:justify-evenly w-full px-2 sm:px-10 lg:px-20 py-10 h-10 bottom-0 bg-gray-800" style="--colorful: {$currentSong?.color};">
    <div class="w-1/4 flex items-center sm:gap-4">
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
        <div class="flex items-center justify-between w-full lg:gap-2">
            <p class="w-fit text-nowrap text-xs">{formatSongTime($currentTime, !!$currentSong)}</p>
            <div class="flex items-center gap-2">
                <PreviousButton/>

                <PlayButton paused={$songQueue.paused} onclick={songQueue.togglePlay}/>

                <NextButton/>
            </div>
            <p class="w-fit text-nowrap text-xs">{formatSongTime($duration, !!$currentSong)}</p>
        </div>

        <ProgressBar min={0} max={$duration} bind:value={$currentTime} interactive/>
    </div>

    
    <div class="w-1/4 flex gap-2 sm:gap-4 justify-center">
        <ToggleViewButton/>
        <ModeButton/>
    </div>
</div>


<style>
    .colorful{
        color: var(--colorful);
    }
</style>
