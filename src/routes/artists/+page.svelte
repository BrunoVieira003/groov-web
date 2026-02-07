<script lang="ts">
    import type { PageProps } from "./$types";
    import EmptyArtist from '$lib/assets/images/empty-artist.png'

    let { data }: PageProps = $props()
</script>

<h1 class="page-title">Artists</h1>
<div class="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {#each data.artists as artist}
        <div class="flex flex-col items-center justify-between p-4 gap-6 bg-slate-900 rounded-xl">
            <img class="size-10/12 rounded-full aspect-square" src={EmptyArtist} alt="artist_cover">
            <a class="text-nowrap hover:underline" href="/artists/{artist.id}">{artist.name}</a>
        </div>
    {/each}
</div>