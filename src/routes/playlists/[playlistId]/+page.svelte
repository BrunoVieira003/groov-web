<script lang="ts">
    import SongItemList from "$lib/components/song-item-list.svelte";
    import SongItem from "$lib/components/song-item.svelte";
    import { songQueue } from "$lib/stores/queue";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()

    function playItem(songId?: string){
        if(data.playlist){
            const songIndex = data.playlist.songs.findIndex(s => s.id === songId)
            const songs = data.playlist.songs
            songQueue.playQueue(songs, songIndex)
        }
    }
</script>

<div class="w-10/12 mx-auto">
    <div class="mb-6">
        <p class="mb-1 text-sm">Playlist</p>
        <h1 class="text-5xl mb-6">{data.playlist?.title}</h1>
        <p class="text-sm">{data.playlist?.songs.length} {data.playlist && data.playlist?.songs.length > 1 ? 'songs': 'song'}</p>
    </div>
    <SongItemList collectionId={data.playlist?.id || ''} collectionType='playlist'>
        {#each data.playlist?.songs as songItem (songItem.id)}
            <SongItem song={songItem} onPlayClick={playItem}/>
        {/each}
    </SongItemList>
</div>