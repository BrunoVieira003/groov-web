<script lang="ts">
    import type { PageProps } from "./$types";
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";

    let { data }: PageProps = $props()
</script>


<h1 class="page-title w-fit not-sm:mx-auto text-highlight">Songs</h1>
<PlayAll tracks={data.songs || []} collectionType='library' collectionName='All songs'/>

<SongList
collectionId=''
collectionName='All songs'
collectionType='library'
tracks={data.songs || []}
/>