<script lang="ts">
    import type Song from "$lib/types/song";
    import ContextMenu from "./context-menu.svelte";
    import Submenu from "./submenu.svelte";
    import PlaylistSelect from "./forms/playlist-select.svelte";
    import { songQueue, type Collection } from "$lib/stores/queue";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import api from "$lib/plugins/api";
    import { targetedSong, targetedTrackNumber } from "$lib/stores/songAction";
    import { fly } from "svelte/transition";
    import PlayButton from "./player/buttons/play-button.svelte";
    import Marquee from "./marquee.svelte";
    import ArtistsLabel from "./artists-label.svelte";
    import { currentSong, currentTime, paused, togglePlay } from "$lib/stores/player";

    interface props {
        collection?: Collection;
        tracks: Song[];
    }

    let { tracks, collection }: props = $props();

    let contextMenu = $state<ContextMenu>();
    let isOnQueue = $derived($songQueue.tracks.includes($targetedSong));
    let windowWidth = $state<number>(10000);

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
        if (!playlistId) return;

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
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#snippet songItem(
    song: Song,
    trackNumber: number,
    oncontextmenu: (e: MouseEvent) => void,
)}
    <div
        class="grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 bg-neutral-dark rounded-md text-subheading hover:bg-neutral-medium data-[active=true]:bg-neutral-light data-[active=true]:text-heading"
        data-active={song.id === $currentSong?.id}
        style="--colorful: {$currentSong?.color};"
        oncontextmenu={(e) => {
            targetedSong.set(song);
            targetedTrackNumber.set(trackNumber);
            oncontextmenu(e);
        }}
        role="button"
        tabindex="-1"
        transition:fly={{ duration: 100 }}
    >
        <p class="hidden md:block text-center text-legend font-semibold">
            {trackNumber !== undefined ? trackNumber + 1 : ""}
        </p>

        <div class="flex items-center gap-4 overflow-hidden">
            <PlayButton
                paused={!(song.id === $currentSong?.id) || $paused}
                onclick={() => playItem(song)}
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
                {#if collection?.type !== "album" || windowWidth <= 768}
                    <ArtistsLabel artists={song.authors} size="small" />
                {/if}
            </div>
        </div>
        {#if song.album && collection?.type !== "album"}
            <a
                href="/albums/{song.album.id}"
                class="hidden md:block hover:underline">{song.album.title}</a
            >
        {/if}
        {#if collection?.type === "album" && windowWidth > 768}
            <ArtistsLabel artists={song.authors} size="default" />
        {/if}
    </div>
{/snippet}

<div class="relative flex flex-col w-full">
    <div
        class="sticky w-full top-0 grid grid-cols-1 md:grid-cols-[3.5ch_1fr_1fr] items-center justify-start gap-2 p-4 bg-neutral-dark text-legend"
    >
        <p class="hidden md:block text-center">#</p>
        <p class="font-bold text-sm">Title</p>
        {#if collection?.type !== "album"}
            <p class="hidden md:block font-bold text-sm">Album</p>
        {:else}
            <p class="hidden md:block font-bold text-sm">Artists</p>
        {/if}
    </div>
    {#each tracks as song, trackNumber (`${song.id}${trackNumber}`)}
        {@render songItem(
            song,
            trackNumber,
            contextMenu ? contextMenu.show : () => {},
        )}
    {/each}
</div>

<ContextMenu bind:this={contextMenu}>
    <div class="flex flex-col">
        <p
            class="font-semibold text-legend text-sm text-center py-2 w-full mx-auto"
        >
            Options
        </p>

        <button
            class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light"
            onclick={playNextQueue}>Play next</button
        >
        <button
            class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light"
            onclick={addToQueue}>Add to the queue</button
        >
        {#if isOnQueue}
            <button
                class="px-4 py-2 cursor-pointer rounded-md hover:bg-neutral-light"
                onclick={removeFromQueue}>Remove from queue</button
            >
        {/if}

        <Submenu
            label="Add to playlist"
            labelClass="w-full px-4 py-2 rounded-md hover:bg-neutral-light cursor-pointer"
        >
            <PlaylistSelect onPick={addToPlaylist} />
        </Submenu>
        {#if collection?.type === "playlist"}
            <button
                class="text-md cursor-pointer px-4 py-2 hover:bg-neutral-light rounded-md"
                onclick={() => removeFromPlaylist(collection.id)}
                >Remove from playlist</button
            >
        {/if}
    </div>
</ContextMenu>
