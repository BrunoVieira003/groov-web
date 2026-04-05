<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import SongItem from "$lib/components/song-item.svelte";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from '$lib/assets/images/empty.png'
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()

    let coverImage: HTMLImageElement

    function playItem(songId?: string){
        if(data.album){
            const songIndex = data.album.songs.findIndex(s => s.id === songId)
            const songs = data.album.songs
            songQueue.playQueue(songs, songIndex, 'album', data.album.title)
        }
    }
</script>

<div class="w-full sm:w-10/12 sm:mx-auto">
    <div class="mb-6">
        <div class="flex flex-wrap justify-center sm:justify-start gap-6 mx-2 sm:mx-auto">
            <img
            bind:this={coverImage}
            src="{PUBLIC_API_URL}/albums/{data.album?.id}/cover"
            alt="album_cover_art"
            class="aspect-square! self-center size-60 rounded-xl object-cover"
            onerror={() => coverImage.src = emptyImage}
            >
            <div class="mx-auto text-center sm:text-start sm:mx-0">
                <h1 class="text-5xl mb-2">{data.album?.title}</h1>
                <a href="/artists/{data.album?.artist.id}" class="text-xl mb-6 hover:underline">{data.album?.artist.name}</a>
                <p class="text-sm">{data.album?.songs.length} {data.album && data.album?.songs.length > 1 ? 'songs': 'song'}</p>
            </div>
        </div>
    </div>
    <SongItemList collectionId={data.album?.id || ''} collectionType='album'>
        {#each data.album?.songs as songItem, index (`${songItem.id}${index}`)}
            <SongItem song={songItem} onPlayClick={playItem}/>
        {/each}
    </SongItemList>
</div>