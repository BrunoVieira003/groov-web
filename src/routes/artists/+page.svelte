<script lang="ts">
    import type { PageProps } from "./$types";
    import EmptyArtist from '$lib/assets/images/empty-artist.png'

    let { data }: PageProps = $props()
</script>

<div class="w-full sm:w-10/12 sm:mx-auto">
    <h1 class="page-title">Artists</h1>
    <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {#each data.artists as artist}
            <div class="flex flex-col items-center justify-between p-4 gap-6 bg-neutral-medium rounded-xl">
                <img class="size-10/12 rounded-full aspect-square" src={`https://robohash.org/${artist.name}`} alt="artist_cover">
                <a class="hover:underline line-clamp-2" href="/artists/{artist.id}">{artist.name}</a>
            </div>
        {/each}
    </div>
</div>