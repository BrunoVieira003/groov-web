<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import SongItem from "$lib/components/song-item.svelte";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from '$lib/assets/images/empty.png'
    import ArtistsLabel from "$lib/components/artists-label.svelte";

    // svelte-ignore non_reactive_update
        let coverImage: HTMLImageElement

    let coverArtURL = $derived(() => {
        if(!$currentSong){
            return 'https://robohash.org/groov'
        }

        return `${PUBLIC_API_URL}/songs/${$currentSong.id}/cover`
    })

    function playItem(songId?: string){
        const songIndex = $songQueue.tracks.findIndex(s => s.id === songId)
        songQueue.playQueue($songQueue.tracks, songIndex)
    }

</script>


{#if $currentSong}
<div class="flex flex-col gap-4 w-fit items-stretch mx-auto" style="--colorful: {$currentSong.color}; --colorful-glow: {$currentSong.color}4D;">
    <img
    bind:this={coverImage}
    src={coverArtURL()}
    alt="cover_art"
    class:colorful-glow={!!$currentSong.color}
    class="aspect-square! self-center size-120 rounded-xl object-cover white-glow"
    onerror={() => coverImage.src = emptyImage}
    >
    <div class="flex items-center justify-between mx-2">
        <div>
            <p class="colorful text-lg font-bold line-clamp-1">{$currentSong?.title}</p>
            <ArtistsLabel artists={$currentSong?.authors || []}/>
        </div>
        <div>
            <p>{$currentSong?.year}</p>
        </div>
    </div>
</div>
<div class="mt-20 w-11/12 mx-auto">
    <h1 class="text-xl mb-4">Queue</h1>
    <SongItemList>
        {#each $songQueue.tracks as track}
            <SongItem song={track} onPlayClick={playItem}/>
        {/each}
    </SongItemList>
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
