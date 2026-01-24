<script lang="ts">
    import type { PageProps } from "./$types";
    import SongItem from "$lib/components/song-item.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import { songQueue } from "$lib/stores/queue";
    import playIcon from '$lib/assets/icons/play.svg'

    let { data }: PageProps = $props()

    function handlePlayAll(){
        songQueue.playQueue(data.songs || [])
    }

    function playItem(songId?: string){
        if(data.songs){
            const songIndex = data.songs.findIndex(s => s.id === songId)
            songQueue.playQueue(data.songs, songIndex)
        }
    }
</script>


<h1 class="page-title">Songs</h1>
<button
class="flex items-center gap-4 bg-slate-700 rounded-full py-2 px-4 mb-6"
onclick={handlePlayAll}
>
    <img src={playIcon} alt="play_icon" class='size-10'/>
    Play all
</button>

<SongItemList>
    {#each data.songs as song}
       <SongItem {song} onPlayClick={playItem}/>
    {/each}
</SongItemList>