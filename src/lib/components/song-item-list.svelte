<script lang="ts">
    import { setCollectionContext, type CollectionType } from "$lib/contexts/collection-context";
    import type Song from "$lib/types/song";
    import SongItem from "./song-item.svelte";
    import ContextMenu from "./context-menu.svelte";
    import Submenu from "./submenu.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import { songQueue } from "$lib/stores/queue";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import api from "$lib/plugins/api";
    import { targetedSong, targetedTrackNumber } from "$lib/stores/songAction";
    import { currentSong } from "$lib/stores/currentSong";

    interface props{
        collectionId?: string
        collectionType?: CollectionType
        collectionName: string | undefined
        tracks: Song[]
    }

    let {tracks, collectionType, collectionName, collectionId}: props = $props()

    setCollectionContext({
        collectionId: collectionId,
        collectionType: collectionType || 'other',
        collectionName: collectionName,
        tracks: tracks
    })

    let contextMenu = $state<ContextMenu>()
    let isOnQueue = $derived($songQueue.tracks.includes($targetedSong))

    function addToPlaylist(playlistId: string) {
        api.post(`/playlists/${playlistId}/song`, {
            songId: $targetedSong.id,
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
        if(!playlistId) return

        api.delete(`/playlists/${playlistId}/song`, {
            data: { songId: $targetedSong.id },
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

    function addToQueue(){
        songQueue.addToQueue($targetedSong)
        contextMenu?.hide()
        toast.success("Song added to queue");
    }

    function removeFromQueue(){
        songQueue.removeFromQueue($targetedTrackNumber)
        contextMenu?.hide()
        toast.success("Song removed from queue");
    }

    function playNextQueue(){
        songQueue.playNext($targetedSong)
        contextMenu?.hide()
        toast.success("Song added to queue");
    }
</script>

<div class="relative flex flex-col w-full">
    <div class="sticky w-full -top-6 grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 bg-neutral-dark text-legend">
        <p class="text-center">#</p>
        <p class="font-bold text-sm">Title</p>
        <p class="hidden md:block font-bold text-sm">Album</p>
    </div>
    {#each tracks as song, trackNumber (`${song.id}${trackNumber}`)}
        <SongItem song={song} {trackNumber} oncontextmenu={contextMenu ? contextMenu.show: () => {} }/>
    {/each}
</div>

<ContextMenu bind:this={contextMenu}>
    <div class="flex flex-col">
        <p
            class="font-semibold text-heading text-sm text-center py-2 w-full mx-auto"
        >
            Options
        </p>

        <button class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light" onclick={playNextQueue}>Play next</button>
        <button class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light" onclick={addToQueue}>Add to the queue</button>
        {#if isOnQueue}
            <button class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light" onclick={removeFromQueue}>Remove from queue</button>
        {/if}

        <Submenu
            label="Add to playlist"
            labelClass="w-full px-4 py-2 rounded-md hover:bg-neutral-light cursor-pointer"
        >
            <PlaylistSelect onPick={addToPlaylist} />
        </Submenu>
        {#if collectionType === "playlist"}
            <button
                class="text-md cursor-pointer px-4 py-2 hover:bg-neutral-light rounded-md"
                onclick={() =>
                    removeFromPlaylist(collectionId)}
                >Remove from playlist</button
            >
        {/if}
    </div>
</ContextMenu>