<script lang="ts">
    import type Song from "$lib/types/song";
    import ContextMenu from "./context-menu/context-menu.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import { songQueue, type Collection } from "$lib/stores/queue";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import { targetedSong, targetedTrackNumber } from "$lib/stores/songAction";
    import {
        currentSong,
        currentTime,
        togglePlay,
    } from "$lib/stores/player";
    import ContextMenuButton from "./context-menu/context-menu-button.svelte";
    import ContextMenuSubmenu from "./context-menu/context-menu-submenu.svelte";
    import ContextMenuDivider from "./context-menu/context-menu-divider.svelte";
    import SongItem from "./song-item.svelte";
    import { setCollection } from "$lib/contexts/collection-context";

    interface props {
        collection?: Collection;
        tracks: Song[];
    }

    let {collection, ...props}: props = $props();

    type DragTargetEvent = DragEvent & {
        currentTarget: EventTarget & HTMLDivElement;
    };

    let tracks = $state(props.tracks);

    // svelte-ignore state_referenced_locally
    if (collection) {
        setCollection({ collection, tracks });
    }


    let contextMenu = $state<ContextMenu>();
    let isOnQueue = $derived($songQueue.tracks.includes($targetedSong));
    let windowWidth = $state<number>(10000);

    let dragFrom = $state<number | null>(null);
    let dragTo = $state<number | null>(null);

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

    function removeFromPlaylist(playlistId: string | undefined) {
        if (!playlistId) return;

        fetch(`/api/playlists/${playlistId}/song`, {
            method: "DELETE",
            body: JSON.stringify({ relationId: $targetedSong?.relationId }),
        })
            .then(() => {
                toast.success("Song removed from playlist");
            })
            .catch(() => {
                toast.error("Failed to remove song from playlist");
            })
            .finally(async () => {
                contextMenu?.hide();
                await invalidateAll();
            });
    }

    function addToQueue() {
        songQueue.addToQueue($targetedSong);
        contextMenu?.hide();
        toast.success("Song added to queue");
    }

    function removeFromQueue() {
        songQueue.removeFromQueue($targetedTrackNumber);
        contextMenu?.hide();
        toast.success("Song removed from queue");
    }

    function playNextQueue() {
        songQueue.playNext($targetedSong);
        contextMenu?.hide();
        toast.success("Song added to queue");
    }

    function playItem(song: Song) {
        if (song.id === $currentSong?.id) {
            togglePlay();
            return;
        }

        const songIndex = tracks.findIndex((s) => s.id === song.id);
        songQueue.playQueue(tracks, songIndex, collection);
        currentTime.set(0);
    }

    function dragStart(e: DragTargetEvent) {
        if (collection?.type !== "playlist") return;
        dragFrom = parseInt(e.currentTarget.dataset.index ?? "");
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
        }
    }

    function dragOver(e: DragTargetEvent) {
        if (collection?.type !== "playlist") return;
        e.preventDefault();

        const currentIndex = e.currentTarget.dataset.index;
        console.log(dragFrom, currentIndex);

        if (
            currentIndex !== undefined &&
            dragFrom !== null &&
            dragFrom !== parseInt(currentIndex)
        ) {
            dragTo = parseInt(currentIndex);
            let [item] = tracks.splice(dragFrom, 1);
            tracks.splice(dragTo, 0, item);
            dragFrom = dragTo;
        }
    }

    function dragEnd(e: DragTargetEvent) {
        if (collection?.type !== "playlist") return;
        dragFrom = null;
        dragTo = null;
        const relationIds = tracks.map((s) => s.relationId);

        fetch(`/api/playlists/${collection?.id}/reorder`, {
            method: "PATCH",
            body: JSON.stringify({ relationIds }),
        })
            .then(() => {
                toast.success("Order saved");
                invalidateAll();
            })
            .catch(() => {
                toast.error("Failed to save change playlist order");
            });
    }
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="relative flex flex-col w-full">
    <div
        class="sticky w-full -top-4 grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 bg-neutral-dark text-legend"
    >
        <p class="hidden md:block text-center">#</p>
        <p class="font-bold text-sm">Title</p>
        {#if collection?.type !== "album"}
            <p class="hidden md:block font-bold text-sm">Album</p>
        {:else}
            <p class="hidden md:block font-bold text-sm">Artists</p>
        {/if}
    </div>
    {#each tracks as song, index (collection?.type === "playlist" ? song.relationId : song)}
        <SongItem
            {song}
            {index}
            trackNumber={song.trackNumber ?? index + 1}
            onPlay={() => playItem(song)}
            onContextMenu={(e) => {
                targetedSong.set(song);
                targetedTrackNumber.set(song.trackNumber ?? index + 1);
                contextMenu && contextMenu.show(e);
            }}
            draggable={collection?.type === "playlist"}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
        />
    {/each}
</div>

<ContextMenu bind:this={contextMenu}>
    <div class="flex flex-col">
        <ContextMenuButton onclick={playNextQueue}>Play next</ContextMenuButton>
        <ContextMenuButton onclick={addToQueue}
            >Add to the queue</ContextMenuButton
        >
        {#if isOnQueue}
            <ContextMenuButton onclick={removeFromQueue}
                >Remove from queue</ContextMenuButton
            >
        {/if}

        <ContextMenuSubmenu label="Add to playlist">
            <PlaylistSelect onPick={addToPlaylist} />
        </ContextMenuSubmenu>
        {#if collection?.type === "playlist"}
            <ContextMenuDivider title="Playlist actions" />
            <ContextMenuButton onclick={() => removeFromPlaylist(collection.id)}
                >Remove from playlist</ContextMenuButton
            >
        {/if}
    </div>
</ContextMenu>
