<script lang="ts">
    import type { PageProps } from "./$types";
    import SongItem from "$lib/components/song-item.svelte";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import { songQueue } from "$lib/stores/queue";
    import playIcon from '$lib/assets/icons/play.svg?raw'

    let { data }: PageProps = $props()

    function handlePlayAll(){
        songQueue.playQueue(data.songs || [], 0, 'library', 'All songs')
    }
</script>


<h1 class="page-title">Songs</h1>
<button
class="flex items-center gap-4 bg-slate-700 rounded-full py-2 px-4 mb-6"
onclick={handlePlayAll}
>
    <div class="text-white size-10 data-[enabled=false]:opacity-20">
        {@html playIcon}
    </div>
    Play all
</button>

<SongItemList
collectionId=''
collectionName='All songs'
collectionType='library'
tracks={data.songs || []}
/>