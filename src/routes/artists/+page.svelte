<script lang="ts">
    import type { PageProps } from "./$types";
    import { fallbackImage } from "$lib/plugins/fallbackImage";

    let { data }: PageProps = $props()
</script>

<div class="">
    <h1 class="page-title w-fit not-sm:mx-auto">Artists</h1>
    <div class="grid gap-4 sm:gap-8 grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {#each data.artists as artist, i}
            <div class="flex flex-col items-center justify-between p-4 gap-6 bg-neutral-medium rounded-xl">
                <img class="rounded-full aspect-square" src="/api/media/artists/{artist.id}/cover" alt="artist_cover" onerror={fallbackImage}>
                <a class="hover:underline line-clamp-2" href="/artists/{artist.id}">{artist.name}</a>
            </div>
        {/each}
    </div>
</div>