<script lang="ts">
    import type { PageProps } from "./$types";
    import PlayAll from "$lib/components/buttons/play-all.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import PageHeader from "$lib/components/page-header.svelte";
    import SearchFilter from "$lib/components/search-filter.svelte";

    let { data }: PageProps = $props()
</script>


<PageHeader title="Songs" subtitle="{data.songs?.length} songs">
    <SearchFilter placeholder="Search song by title..."/>
</PageHeader>
<PlayAll tracks={data.songs || []} collection={ {type: 'library', name: 'All songs'} }/>

{#if data.songs?.length}
    <SongList
    collection={ {type: 'library', name: 'All songs'} }
    tracks={data.songs}
    />
{:else}
    <p class="text-heading text-lg">No songs found.</p>
{/if}