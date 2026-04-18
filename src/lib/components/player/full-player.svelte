<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatSongTime } from "$lib/formatters/songTime";
    import PlayButton from "./buttons/play-button.svelte";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from "$lib/assets/images/empty.png";
    import ArtistsLabel from "../artists-label.svelte";
    import PreviousButton from "./buttons/previous-button.svelte";
    import NextButton from "./buttons/next-button.svelte";
    import ToggleViewButton from "./buttons/toggle-view-button.svelte";
    import ProgressBar from "../progress-bar.svelte";
    import ModeButton from "./buttons/mode-button.svelte";
    import Marquee from "../marquee.svelte";
    import Volume from "./buttons/volume.svelte";
    import { fly } from "svelte/transition";
    import { currentSong, currentTime, duration, paused, togglePlay } from "$lib/stores/player";
    import { albumLayout } from "$lib/stores/settings";
    import Cassete from "../cassete.svelte";

    let coverImage: HTMLImageElement;

    let coverArtURL = $derived(
        `${PUBLIC_API_URL}/songs/${$currentSong?.id}/cover`,
    );
</script>

<div
    class="absolute top-0 h-full flex flex-col items-center justify-evenly w-full py-10 bg-neutral-dark"
    style:--colorful={$currentSong?.color}
    style:--colorful-contrast={$currentSong?.contrastColor}
    transition:fly={{ duration: 100 }}
>
    <div
        class="w-full h-full full-view"
        style="background-image: url({coverArtURL});"
    ></div>

    <div
        class="w-11/12 sm:w-5/6 lg:w-3/5 flex flex-col data-[layout=cassete]:flex-col md:flex-row items-center data-[layout=cassete]:gap-6 gap-10 xl:gap-16 z-1"
        data-layout="{$albumLayout}"
    >
        {#if $albumLayout === 'default'}
            <img
                bind:this={coverImage}
                src={coverArtURL}
                alt="cover_art"
                class="size-100 aspect-square rounded-lg object-cover"
                onerror={() => (coverImage.src = emptyImage)}
            />
        {/if}

        {#if $albumLayout === 'cassete'}
            <div class="w-2/4">
                <Cassete title={$currentSong?.title} coverImageSrc={coverArtURL} spinning={!$paused}/>
            </div>
        {/if}

        <div class="flex flex-col w-full gap-10 overflow-hidden" data-layout="{$albumLayout}">
            <div>
                {#if $albumLayout === 'default'}
                    <Marquee>
                        <p class="text-(--colorful-contrast) font-bold text-5xl text-shadow-lg">
                            {$currentSong?.title}
                        </p>
                    </Marquee>
                {/if}
                <div class="data-[layout=cassete]:mx-auto w-fit" data-layout="{$albumLayout}">
                    <ArtistsLabel
                        artists={$currentSong?.authors || []}
                        size="big"
                        color="default"
                    />
                </div>
            </div>

            <div
                class="flex flex-col w-full items-center gap-2 justify-center z-1"
            >
                <div class="flex w-full items-center justify-between gap-2">
                    <p class="w-fit text-nowrap text-xs text-subheading">
                        {formatSongTime($currentTime, !!$currentSong)}
                    </p>
                    <div class="flex items-center gap-2">
                        <PreviousButton />

                        <PlayButton
                            paused={$paused}
                            onclick={togglePlay}
                        />

                        <NextButton />
                    </div>
                    <p class="w-fit text-nowrap text-xs text-subheading">
                        {formatSongTime($duration, !!$currentSong)}
                    </p>
                </div>

                <ProgressBar
                    min={0}
                    max={$duration}
                    bind:value={$currentTime}
                    interactive
                />
            </div>

            <div class="w-fit flex gap-4 mx-auto">
                <ToggleViewButton />
                <ModeButton />
                <Volume />
            </div>
        </div>
    </div>

    <div class="w-1/3 flex justify-center z-1"></div>
</div>

<style>
    .full-view {
        position: absolute;
        top: 0;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(200px);
        box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.8);
    }
</style>
