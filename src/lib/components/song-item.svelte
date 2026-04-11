<script lang="ts">
    import api from "$lib/plugins/api";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import type Song from "$lib/types/song";
    import toast from "svelte-hot-french-toast";
    import ArtistsLabel from "./artists-label.svelte";
    import ContextMenu from "./context-menu.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import PlayButton from "./player/buttons/play-button.svelte";
    import { getCollectionContext } from "$lib/contexts/collection-context";
    import { invalidateAll } from "$app/navigation";
    import Submenu from "./submenu.svelte";
    import { fly } from "svelte/transition";
    import Marquee from "./marquee.svelte";

    interface PropsType {
        song: Song;
        trackNumber: number
    }

    let contextMenu = $state<ContextMenu>();

    let { song, trackNumber }: PropsType = $props();

    let selected = $derived(() =>  $currentSong?.id === song.id && trackNumber === $songQueue.currentIndex);
    let isOnQueue  = $derived(() => $songQueue.tracks.includes(song))

    let collectionContext = getCollectionContext();

    function playItem() {
        if (selected()) {
            songQueue.togglePlay();
            return;
        }

        const songIndex = collectionContext.tracks.findIndex(s => s.id === song.id)
        songQueue.playQueue(collectionContext.tracks, songIndex, collectionContext.collectionType, collectionContext.collectionName, collectionContext.collectionId || '')
    }

    function addToPlaylist(playlistId: string) {
        api.post(`/playlists/${playlistId}/song`, {
            songId: song.id,
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
            data: { songId: song.id },
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
        songQueue.addToQueue(song)
        contextMenu?.hide()
        toast.success("Song added to queue");
    }

    function removeFromQueue(){
        songQueue.removeFromQueue(trackNumber)
        contextMenu?.hide()
        toast.success("Song removed from queue");
    }

    function playNextQueue(){
        songQueue.playNext(song)
        contextMenu?.hide()
        toast.success("Song added to queue");
    }
</script>

<ContextMenu bind:this={contextMenu}>
    <div class="flex flex-col">
        <p
            class="font-semibold text-heading text-sm text-center py-2 w-full mx-auto"
        >
            Options
        </p>

        <button class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light" onclick={playNextQueue}>Play next</button>
        <button class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light" onclick={addToQueue}>Add to the queue</button>
        {#if isOnQueue()}
        <button class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light" onclick={removeFromQueue}>Remove from queue</button>
        {/if}

        <Submenu
            label="Add to playlist"
            labelClass="w-full px-4 py-2 rounded-md hover:bg-neutral-light cursor-pointer"
        >
            <PlaylistSelect onPick={addToPlaylist} />
        </Submenu>
        {#if collectionContext.collectionType === "playlist"}
            <button
                class="text-md cursor-pointer px-4 py-2 hover:bg-neutral-light rounded-md"
                onclick={() =>
                    removeFromPlaylist(collectionContext.collectionId)}
                >Remove from playlist</button
            >
        {/if}
    </div>
</ContextMenu>

<div
    class="grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 bg-neutral-dark rounded-md text-subheading hover:bg-neutral-medium data-[active=true]:bg-neutral-lighter data-[active=true]:text-heading"
    data-active={selected()}
    oncontextmenu={contextMenu.show}
    role="button"
    tabindex="-1"
    transition:fly={{ duration: 100 }}
>
    <p class="hidden md:block text-center">{trackNumber !== undefined ? trackNumber+1 : ''}</p>

    <div class="flex items-center gap-4">
        <PlayButton
            paused={!selected() || $songQueue.paused}
            onclick={playItem}
        />
        <div class="flex flex-col w-full overflow-hidden">
            <Marquee>
                <p class="font-bold text-md text-heading">{song.title}</p>
            </Marquee>
            <ArtistsLabel artists={song.authors} size='small'/>
        </div>
    </div>
    {#if song.album}
        <a
            href="/albums/{song.album.id}"
            class="hidden md:block hover:underline">{song.album.title}</a
        >
    {/if}
</div>