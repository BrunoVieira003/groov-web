<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from '$lib/assets/images/empty.png'
    import ArtistsLabel from "$lib/components/artists-label.svelte";
    import Marquee from "$lib/components/marquee.svelte";
    import type { derived } from "svelte/store";
    import SongList from "$lib/components/song-list.svelte";

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
<div class="flex flex-col gap-4 w-10/12 mx-auto sm:w-4/12" style="--colorful: {$currentSong.color}; --colorful-glow: {$currentSong.color}4D;">
    {#if $songQueue.collectionName}
        <div class="-mb-2">
            <p class="text-sm text-legend">Playing from {$songQueue.collectionType}</p>
            <a href={collectionLink()} class="text-lg text-heading">{$songQueue.collectionName}</a>
        </div>
    {/if}
    <img
    bind:this={coverImage}
    src={coverArtURL()}
    alt="cover_art"
    class:colorful-glow={!!$currentSong.color}
    class="sm:max-w-120 rounded-xl object-cover white-glow"
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
            <p class="text-legend">{$currentSong?.year}</p>
        </div>
    </div>
</div>
<div class="mt-20 w-11/12 sm:w-11/12 mx-auto">
    <h1 class="text-xl mb-4">Queue</h1>
    <SongList 
    collectionName={$songQueue.collectionName}
    collectionType={'other'}
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
