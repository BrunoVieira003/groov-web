<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()
</script>

<div class="w-11/12 sm:w-10/12 mx-auto">
    <h1 class="page-title w-fit not-sm:mx-auto">Artists</h1>
    <div class="grid gap-4 sm:gap-8 grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {#each data.artists as artist}
            <div class="flex flex-col items-center justify-between p-4 gap-6 bg-neutral-medium rounded-xl">
                <img class="size-10/12 rounded-full aspect-square" src={`https://robohash.org/${artist.name}`} alt="artist_cover">
                <a class="hover:underline line-clamp-2" href="/artists/{artist.id}">{artist.name}</a>
            </div>
        {/each}
    </div>
</div>