<script lang="ts">
    import { getCollection } from "$lib/contexts/collection-context";
    import { fallbackImage } from "$lib/plugins/fallbackImage";
    import { currentSong, paused } from "$lib/stores/player";
    import { targetedSong, targetedTrackIndex } from "$lib/stores/songAction";
    import type Song from "$lib/types/song";
    import { fly } from "svelte/transition";
    import PlayButton from "./player/buttons/play-button.svelte";
    import Marquee from "./marquee.svelte";
    import ArtistsLabel from "./artists-label.svelte";
    import type { DragEventHandler, MouseEventHandler } from "svelte/elements";
    import ContextMenu, {
        type ContextAction,
    } from "./context-menu/context-menu.svelte";
    import { songQueue } from "$lib/stores/queue";
    import toast from "svelte-hot-french-toast";

    interface PropsType {
        song: Song;
        trackNumber: number;
        index: number;
        onPlay: MouseEventHandler<HTMLButtonElement> | null | undefined;
        draggable?: boolean;
        onDragStart?: DragEventHandler<HTMLDivElement> | null | undefined;
        onDragEnd?: DragEventHandler<HTMLDivElement> | null | undefined;
        onDragOver?: DragEventHandler<HTMLDivElement> | null | undefined;
        extraActions?: ContextAction[];
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
        extraActions = [],
    }: PropsType = $props();

    let windowWidth = $state<number>(10000);
    let contextMenu = $state<ContextMenu>();

    function addToQueue() {
        songQueue.addToQueue($targetedSong);
        toast.success("Song added to queue");
    }

    function playNextQueue() {
        songQueue.playNext($targetedSong);
        toast.success("Song added to queue");
    }

    function addToPlaylist(playlistId: string) {
        fetch(`/api/playlists/${playlistId}/song`, {
            method: "POST",
            body: JSON.stringify({ songId: $targetedSong.id }),
        })
            .then(() => {
                toast.success("Song added to playlist");
            })
            .catch(() => {
                toast.error("Failed to add song to playlist");
            })
            .finally(contextMenu?.hide);
    }

    function openContextMenu(e: MouseEvent) {
        targetedSong.set(song);
        targetedTrackIndex.set(index);
        contextMenu?.show(e);
    }

    const collection = getCollection();

    let actions = $derived<ContextAction[]>([
        { label: "Play next", cmd: playNextQueue },
        { label: "Add to the queue", cmd: addToQueue },
        ...extraActions,
    ]);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
    class="grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 text-subheading hover:bg-bg-hover data-[active=true]:bg-bg-active data-[active=true]:text-heading"
    data-active={song.id === $currentSong?.id}
    style="--colorful: {$currentSong?.color};"
    oncontextmenu={openContextMenu}
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
            src="/api/media/songs/{song.id}/cover"
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
            {#if collection?.collection.type !== "album" || windowWidth <= 768}
                <ArtistsLabel artists={song.authors} size="small" />
            {/if}
        </div>
    </div>
    {#if song.album && collection?.collection.type !== "album"}
        <a
            href="/albums/{song.album.id}"
            class="hidden md:block hover:underline">{song.album.title}</a
        >
    {/if}
    {#if collection?.collection?.type === "album" && windowWidth > 768}
        <ArtistsLabel artists={song.authors} size="default" />
    {/if}
</div>

<ContextMenu
    bind:this={contextMenu}
    {actions}
    afterExecute={contextMenu?.hide}
/>
