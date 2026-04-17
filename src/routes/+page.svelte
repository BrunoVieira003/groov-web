<script lang="ts">
    import type { PageProps } from "./$types";
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";

    let { data }: PageProps = $props()
</script>


<h1 class="page-title w-fit not-sm:mx-auto text-highlight">Songs</h1>
<PlayAll tracks={data.songs || []} collection={ {type: 'library', name: 'All songs'} }/>

<SongList
collection={ {type: 'library', name: 'All songs'} }
tracks={data.songs || []}
/>