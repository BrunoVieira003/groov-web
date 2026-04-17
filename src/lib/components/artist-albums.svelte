<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import type { AlbumSummary } from "$lib/types/album";
    import emptyImage from '$lib/assets/images/empty.png'
    import Marquee from "./marquee.svelte";
    import DefaultAlbum from "./album/DefaultAlbum.svelte";

    interface PropsType{
        albums: AlbumSummary[]
    }

    let { albums }: PropsType = $props()

    // svelte-ignore non_reactive_update
        let coverImage: HTMLImageElement
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {#each albums as album}
        <DefaultAlbum album={album}/>
    {/each}
</div>