<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from '$lib/assets/images/empty.png'
    import ArtistsLabel from "$lib/components/artists-label.svelte";
    import Marquee from "$lib/components/marquee.svelte";
    import type { derived } from "svelte/store";

    // svelte-ignore non_reactive_update
        let coverImage: HTMLImageElement

    let coverArtURL = $derived(() => {
        if(!$currentSong){
            return 'https://robohash.org/groov'
        }

        return `${PUBLIC_API_URL}/songs/${$currentSong.id}/cover`
    })

    let collectionLink = $derived(() => {
        switch ($songQueue.collectionType){
            case 'artist': return `/artists/${$songQueue.collectionId}`
            case 'album': return `/albums/${$songQueue.collectionId}`
            case 'playlist': return `/playlists/${$songQueue.collectionId}`
            default: return ''
        }
    })

</script>


{#if $currentSong}
<div class="flex flex-col gap-4 w-4/12 mx-2 sm:mx-auto" style="--colorful: {$currentSong.color}; --colorful-glow: {$currentSong.color}4D;">
    {#if $songQueue.collectionName}
        <div class="-mb-2">
            <p class="text-sm">Playing from {$songQueue.collectionType}</p>
            <a href={collectionLink()} class="text-lg">{$songQueue.collectionName}</a>
        </div>
    {/if}
    <img
    bind:this={coverImage}
    src={coverArtURL()}
    alt="cover_art"
    class:colorful-glow={!!$currentSong.color}
    class="sm:size-120 rounded-xl object-cover white-glow"
    onerror={() => coverImage.src = emptyImage}
    >
    <div class="flex items-center justify-between w-full sm:w-120 overflow-hidden">
        <div class="w-full">
            <Marquee>
                <p class="colorful text-xl font-bold">{$currentSong?.title}</p>
            </Marquee>
            <ArtistsLabel artists={$currentSong?.authors || []}/>
        </div>
        <div>
            <p>{$currentSong?.year}</p>
        </div>
    </div>
</div>
<div class="mt-20 w-full sm:w-11/12 sm:mx-auto">
    <h1 class="text-xl mb-4">Queue</h1>
    <SongItemList 
    collectionName={$songQueue.collectionName}
    collectionType={$songQueue.collectionType}
    tracks={$songQueue.tracks}
    />
</div>
{/if}

<style>
    .colorful{
        color: var(--colorful);
    }

    .colorful-glow{
        -webkit-box-shadow:0px 0px 300px 0px var(--colorful-glow);
        -moz-box-shadow: 0px 0px 300px 0px var(--colorful-glow);
        box-shadow: 0px 0px 300px 0px var(--colorful-glow);
    }
</style>
