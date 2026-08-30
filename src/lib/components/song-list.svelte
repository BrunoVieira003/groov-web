<script lang="ts">
    import type Song from "$lib/types/song";
    import { songQueue, type Collection } from "$lib/stores/queue";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import {
        currentSong,
        currentTime,
        togglePlay,
    } from "$lib/stores/player";
    import SongItem from "./song-item.svelte";
    import { setCollection } from "$lib/contexts/collection-context";

    interface props {
        collection?: Collection;
        tracks: Song[];
    }

    let {collection, tracks}: props = $props();

    type DragTargetEvent = DragEvent & {
        currentTarget: EventTarget & HTMLDivElement;
    };

    // svelte-ignore state_referenced_locally
    if (collection) {
        setCollection({ collection, tracks });
    }

    let windowWidth = $state<number>(10000);

    let dragFrom = $state<number | null>(null);
    let dragTo = $state<number | null>(null);

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
        class="sticky w-full bg-background -top-4 grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 text-legend"
    >
        <p class="hidden md:block text-center">#</p>
        <p class="font-bold text-sm">Title</p>
        {#if collection?.type !== "album"}
            <p class="hidden md:block font-bold text-sm">Album</p>
        {:else}
            <p class="hidden md:block font-bold text-sm">Artists</p>
        {/if}
    </div>
    {#each tracks as song, index (index)}
        <hr class="text-divider">
        <SongItem
            {song}
            {index}
            trackNumber={song.trackNumber ?? index + 1}
            onPlay={() => playItem(song)}
            draggable={collection?.type === "playlist"}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDragEnd={dragEnd}
        />
    {/each}
</div>
