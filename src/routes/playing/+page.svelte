<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import SongItem from "$lib/components/song-item.svelte";
    import { currentSong } from "$lib/stores/currentSong";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from '$lib/assets/images/empty.png'

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
<div class="flex flex-col gap-4 w-fit items-stretch mx-auto">
    <img
    bind:this={coverImage}
    src={coverArtURL()}
    alt="cover_art"
    class="aspect-square! self-center size-120 rounded-xl"
    onerror={() => coverImage.src = emptyImage}
    >
    <div class="flex items-center justify-between mx-2">
        <div>
            <p class="text-lg font-bold">{$currentSong?.title}</p>
            <div class="flex gap-1">
                {#each $currentSong?.authors as author}
                    <a class="text-xs hover:underline not-last:after:content-[',']" href="/artists/{author.id}">{author.name}</a>
                {/each}
            </div>
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
