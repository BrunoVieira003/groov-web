<script lang="ts">
    import type { PageProps } from "./$types";
    import ArtistItem from "$lib/components/artist/artist-item.svelte";
    import PageHeader from "$lib/components/page-header.svelte";

    let { data }: PageProps = $props()
</script>

<div class="">
    <PageHeader title="Artists" subtitle="{data.artists?.length} artists"/>
    <div class="grid gap-4 sm:gap-8 grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {#each data.artists as artist, i}
            <ArtistItem {artist}/>
        {/each}
    </div>
</div>