<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatSongTime } from "$lib/formatters/songTime";
    import PlayButton from "./buttons/play-button.svelte";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from '$lib/assets/images/empty.png'
    import ArtistsLabel from "../artists-label.svelte";
    import PreviousButton from "./buttons/previous-button.svelte";
    import NextButton from "./buttons/next-button.svelte";
    import ToggleViewButton from "./buttons/toggle-view-button.svelte";
    import ProgressBar from "../progress-bar.svelte";
    import ModeButton from "./buttons/mode-button.svelte";
    import Marquee from "../marquee.svelte";
    import Volume from "./buttons/volume.svelte";
    import { fly } from "svelte/transition";
    import { currentSong, currentTime, duration } from "$lib/stores/player";

    let coverImage: HTMLImageElement

    let coverArtURL = $derived(`${PUBLIC_API_URL}/songs/${$currentSong?.id}/cover`)

</script>

<div class="sm:hidden h-px">
    <ProgressBar min={0} max={$duration} bind:value={$currentTime} interactive/>
</div>

<div
class="text-white flex items-center justify-center lg:justify-evenly w-full px-2 sm:px-10 lg:px-30 gap-2 sm:gap-4 py-10 h-1/12 bottom-0 bg-neutral-medium"
style="--colorful: {$currentSong?.color};"
transition:fly={{ duration: 200, y: 100 }}
>
    <div class="w-full sm:w-1/4 flex items-center gap-2 sm:gap-4 overflow-hidden">
        <img
        bind:this={coverImage}
        src={coverArtURL}
        alt="cover_art"
        class="size-16 aspect-square rounded object-cover"
        onerror={() => coverImage.src = emptyImage}
        >
        <div class="w-full overflow-hidden">
            <Marquee><a class="colorful font-bold text-md w-fit hover:cursor-pointer hover:underline" href="/playing">{$currentSong?.title}</a></Marquee>
            <ArtistsLabel artists={$currentSong?.authors || []} size='small'/>
        </div>
    </div>
    
    <div class="flex flex-col w-fit px-4 sm:w-2/4 items-center gap-2 justify-center">
        <div class="flex items-center justify-between w-full lg:gap-2">
            <p class="not-sm:hidden w-fit text-nowrap text-xs text-subheading">{formatSongTime($currentTime, !!$currentSong)}</p>
            <div class="flex items-center gap-2">
                <PreviousButton/>

                <PlayButton paused={$songQueue.paused} onclick={songQueue.togglePlay}/>

                <NextButton/>
            </div>
            <p class="not-sm:hidden w-fit text-nowrap text-xs text-subheading">{formatSongTime($duration, !!$currentSong)}</p>
        </div>
        <div class="not-sm:hidden w-full">
            <ProgressBar min={0} max={$duration} bind:value={$currentTime} interactive/>
        </div>

    </div>
    
    
    <div class="not-sm:hidden w-full sm:w-1/4 flex gap-2 sm:gap-4 justify-center items-center">
        <ToggleViewButton/>
        <ModeButton/>
        <Volume/>
    </div>
</div>


<style>
    .colorful{
        color: var(--colorful);
    }
</style>
