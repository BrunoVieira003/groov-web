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

<div class="absolute top-0 h-full flex flex-col text-white items-center justify-evenly w-full py-10 bg-gray-800" style="--colorful: {$currentSong?.color};">
    <div class="w-full h-full full-view" style="background-image: url({coverArtURL()});"></div>

    <div class="w-3/5 flex items-center gap-16 z-1">
        <img
        bind:this={coverImage}
        src={coverArtURL()}
        alt="cover_art"
        class="size-100 aspect-square rounded-lg object-cover"
        onerror={() => coverImage.src = emptyImage}
        >
        <div class="flex flex-col w-full gap-10">
            <div>
                <p class="colorful font-bold text-5xl w-full text-shadow-lg">{$currentSong?.title}</p>
                <ArtistsLabel artists={$currentSong?.authors || []} size='big'/>
            </div>

            <div class="flex flex-col w-full items-center gap-2 justify-center z-1">

                <div class="flex w-full  items-center justify-between gap-2">
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

            <div class="w-1/4 flex gap-4">
                <ToggleViewButton/>
                <ModeButton/>
            </div>
        </div>
    </div>
    
    

    
    <div class="w-1/3 flex justify-center z-1">
    </div>
</div>


<style>
    .colorful{
        color: var(--colorful);
    }

    .full-view{
        position: absolute;
        top: 0;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(200px);
        box-shadow: inset 0 0 150px rgba(0,0,0,0.8);
    }
</style>
