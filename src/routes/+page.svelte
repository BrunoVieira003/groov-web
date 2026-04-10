<script lang="ts">
    import type { PageProps } from "./$types";
    import SongItemList from "$lib/components/song-item-list.svelte";
    import PlayAll from "$lib/components/buttons/play-all.svelte";

    let { data }: PageProps = $props()
</script>


<h1 class="page-title text-highlight">Songs</h1>
<PlayAll tracks={data.songs || []} collectionType='library' collectionName='All songs'/>

<SongItemList
collectionId=''
collectionName='All songs'
collectionType='library'
tracks={data.songs || []}
/>