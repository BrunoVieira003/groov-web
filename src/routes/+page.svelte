<script lang="ts">
    import type { PageProps } from "./$types";
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import PageHeader from "$lib/components/page-header.svelte";

    let { data }: PageProps = $props()
</script>


<PageHeader title="Songs" subtitle="{data.songs?.length} songs"/>
<PlayAll tracks={data.songs || []} collection={ {type: 'library', name: 'All songs'} }/>

<SongList
collection={ {type: 'library', name: 'All songs'} }
tracks={data.songs || []}
/>