<script lang="ts">
    import ArtistAlbums from "$lib/components/artist-albums.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import SongItem from "$lib/components/song-item.svelte";
    import { songQueue } from "$lib/stores/queue";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()

    function playItem(songId?: string){
        if(data.artist){
            const songIndex = data.artist.songs.findIndex(s => s.id === songId)
            const songs = data.artist.songs
            songQueue.playQueue(songs, songIndex, 'artist', data.artist.name)
        }
    }
</script>

<div class="w-full sm:w-10/12 mx-auto">
    <div class="mb-4 text-center sm:text-start">
        <p class="mb-1 text-sm">Artist</p>
        <h1 class="text-5xl mb-6">{data.artist?.name}</h1>
        <h2 class="text-2xl">Songs</h2>
    </div>

    <SongItemList collectionId={data.artist?.id || ''} collectionType='artist'>
        {#each data.artist?.songs as songItem (songItem.id)}
            <SongItem song={songItem} onPlayClick={playItem}/>
        {/each}
    </SongItemList>

    {#if data.artist?.albums && data.artist?.albums.length > 0}
        <h2 class="text-2xl mt-6">Albums</h2>
        <ArtistAlbums albums={data.artist.albums}/>
    {/if}
</div>