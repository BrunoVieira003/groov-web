<script lang="ts">
    import { page } from "$app/state";
    import { PUBLIC_API_URL } from "$env/static/public";
    import Chip from "$lib/components/chip.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import SongItem from "$lib/components/song-item.svelte";
    import { songQueue } from "$lib/stores/queue";
    import { slide } from "svelte/transition";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
    let filters = $state({
        songs: true,
        artists: true,
        playlists: true,
    });

    function playItem(songId?: string) {
        const songs = data.songs || [];
        const songIndex = songs.findIndex((s) => s.id === songId);
        songQueue.playQueue(songs, songIndex);
    }
</script>

<h1 class="text-5xl mb-4 text-center sm:text-start">Results for "{page.url.searchParams.get("q")}"</h1>
<div class="flex gap-2 mb-10 w-fit mx-auto sm:mx-0">
    <Chip bind:active={filters.songs}>Songs</Chip>
    <Chip bind:active={filters.artists}>Artists</Chip>
    <Chip bind:active={filters.playlists}>Playlists</Chip>
</div>

<div class="w-full *:w-full">
    {#if filters.songs}
        <div class="mb-10 text-center sm:text-start" transition:slide={{ duration: 200 }}>
            <h2 class="text-3xl mb-2">Songs</h2>
            <p class="mb-6">{data.songs?.length} results</p>
            <SongItemList>
                {#each data.songs as song}
                    <SongItem {song} onPlayClick={playItem} />
                {/each}
            </SongItemList>
        </div>
    {/if}

    {#if filters.artists}
        <div transition:slide={{ duration: 200 }} class="mb-10 text-center sm:text-start">
            <h2 class="text-3xl mb-2">Artists</h2>
            <p class="mb-6">{data.artists?.length} results</p>
            <div class="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 grid-flow-row gap-2">
                {#each data.artists as artist}
                    <div class="flex flex-col aspect-square p-2 bg-slate-800 w-fit items-center justify-between rounded-xl">
                        <img
                            class="size-9/12 rounded-full aspect-square"
                            src="https://robohash.org/${artist.name}"
                            alt="artist"
                        />
                        <a href="/artists/{artist.id}" class="hover:underline line-clamp-2">{artist.name}</a>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    {#if filters.playlists}
        <div transition:slide={{ duration: 200 }} class="text-center sm:text-start">
            <h2 class="text-3xl mb-2">Playlists</h2>
            <p class="mb-6">{data.playlists?.length} results</p>
            <div class="grid grid-cols-7 grid-flow-row gap-2">
                {#each data.playlists as playlist}
                    <div class="flex flex-col flex-wrap p-2 bg-slate-800 justify-between rounded-xl">
                        <a href="/playlists/{playlist.id}" class="hover:underline text-center">{playlist.title}</a>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
