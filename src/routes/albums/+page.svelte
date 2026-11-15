<script lang="ts">
    import type { PageProps } from "./$types";
    import { albumLayout } from "$lib/stores/settings";
    import Cassete from "$lib/components/cassete.svelte";
    import DefaultAlbum from "$lib/components/album/DefaultAlbum.svelte";
    import { songQueue } from "$lib/stores/queue";
    import { paused } from "$lib/stores/player";
    import CasseteAlbum from "$lib/components/album/CasseteAlbum.svelte";
    import PageHeader from "$lib/components/page-header.svelte";

    let { data }: PageProps = $props();

    const albumMap = {
        "default": DefaultAlbum,
        "cassete": CasseteAlbum
    }

    let AlbumComponent = $derived(albumMap[$albumLayout])
</script>

<PageHeader title="Albums" subtitle="{data.albums?.length} albums"/>
<div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-6"
    class:grid-cols-5={$albumLayout === 'cassete'}
>
    {#each data.albums as album}
        <AlbumComponent {album}/>
    {:else}
        <p class="text-heading text-lg">No albums here yet!</p>
    {/each}
</div>
