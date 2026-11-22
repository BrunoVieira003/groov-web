<script lang="ts">
    import { getCollection } from "$lib/contexts/collection-context";
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import { currentSong, paused } from "$lib/stores/player";
    import type Song from "$lib/types/song";
    import { fly } from "svelte/transition";
    import PlayButton from "./player/buttons/play-button.svelte";
    import Marquee from "./marquee.svelte";
    import ArtistsLabel from "./artists-label.svelte";
    import type { DragEventHandler, MouseEventHandler } from "svelte/elements";
    import { formatSongTime } from "$lib/formatters/songTime";
    import { API_URL } from "$lib";

    interface PropsType {
        song: Song;
        trackNumber: number;
        index: number;
        onPlay: MouseEventHandler<HTMLButtonElement> | null | undefined;
        draggable?: boolean;
        onDragStart?: DragEventHandler<HTMLDivElement> | null | undefined;
        onDragEnd?: DragEventHandler<HTMLDivElement> | null | undefined;
        onDragOver?: DragEventHandler<HTMLDivElement> | null | undefined;
        onContextMenu?: MouseEventHandler<HTMLDivElement> | null | undefined;
        /** Viewport is at or below the md breakpoint (computed once by the parent list) */
        compact?: boolean;
    }

    let {
        song,
        trackNumber,
        index,
        onPlay,
        draggable = false,
        onDragStart,
        onDragOver,
        onDragEnd,
        onContextMenu,
        compact = false,
    }: PropsType = $props();

    const collection = getCollection();
</script>

<div
    class="grid grid-cols-1 md:grid-cols-[3.5ch_2fr_1fr_1fr] items-center justify-start gap-6 p-4 text-subheading hover:bg-bg-hover data-[active=true]:bg-bg-active data-[active=true]:text-heading"
    data-active={song.id === $currentSong?.id}
    style="--colorful: {$currentSong?.colors.vibrant};"
    oncontextmenu={onContextMenu}
    {draggable}
    data-index={index}
    ondragstart={onDragStart}
    ondragover={onDragOver}
    ondragend={onDragEnd}
    role="button"
    tabindex="-1"
    transition:fly={{ duration: 100 }}
>
    <p class="hidden md:block text-center text-legend font-semibold">
        {trackNumber !== undefined ? trackNumber : ""}
    </p>

    <div class="flex items-center gap-4 overflow-hidden">
        <img
            src="{API_URL}/songs/{song.id}/cover"
            alt="album_cover_art"
            class="aspect-square! self-center size-12 rounded-xl object-cover"
            {@attach fallbackImage}
        />
        <PlayButton
            paused={!(song.id === $currentSong?.id) || $paused}
            onclick={onPlay}
        />
        <div class="flex flex-col w-full overflow-hidden">
            <Marquee>
                <p
                    data-active={song.id === $currentSong?.id}
                    class="font-bold text-md text-heading data-[active=true]:text-(--colorful)"
                >
                    {song.title}
                </p>
            </Marquee>
            {#if collection?.collection.type !== "album" || compact}
                <ArtistsLabel artists={song.authors} size="small" />
            {/if}
        </div>
    </div>
    {#if song.album && collection?.collection.type !== "album"}
        <a
            href="/albums/{song.album.id}"
            class="hidden md:block hover:underline">{song.album.title}</a
        >
    {:else if !song.album}
        <span></span>
    {/if}
    {#if collection?.collection?.type === "album" && !compact}
        <ArtistsLabel artists={song.authors} size="default" />
    {/if}
    {#if song.duration}
        <p class="justify-self-end text-sm">{formatSongTime(song.duration)}</p>
    {/if}
</div>

<style>
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-border);
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-border-hover);
    }
</style>