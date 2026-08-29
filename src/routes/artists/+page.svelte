<script lang="ts">
    import type { PageProps } from "./$types";
    import ArtistItem from "$lib/components/artist/artist-item.svelte";

    let { data }: PageProps = $props()
</script>

<div class="">
    <h1 class="page-title text-heading w-fit not-sm:mx-auto">Artists</h1>
    <div class="grid gap-4 sm:gap-8 grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {#each data.artists as artist, i}
            <ArtistItem {artist}/>
        {/each}
    </div>
</div>