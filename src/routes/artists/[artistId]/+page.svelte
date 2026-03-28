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
            songQueue.playQueue(songs, songIndex)
        }
    }
</script>

<div class="w-10/12 mx-auto">
    <div class="mb-6">
        <p class="mb-1 text-sm">Artist</p>
        <h1 class="text-5xl mb-6">{data.artist?.name}</h1>
        <p class="text-sm">{data.artist?.songs.length} {data.artist && data.artist?.songs.length > 1 ? 'songs': 'song'}</p>
    </div>
    <SongItemList collectionId={data.artist?.id || ''} collectionType='artist'>
        {#each data.artist?.songs as songItem (songItem.id)}
            <SongItem song={songItem} onPlayClick={playItem}/>
        {/each}
    </SongItemList>
    {#if data.artist?.albums && data.artist?.albums.length > 0}
        <p class="mt-8">{data.artist.albums.length} {data.artist.albums.length > 1 ? 'albums': 'album'}</p>
        <ArtistAlbums albums={data.artist.albums}/>
    {/if}
</div>