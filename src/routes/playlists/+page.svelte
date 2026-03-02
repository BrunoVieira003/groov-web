<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import PlaylistList from "$lib/components/playlist-list.svelte";
import SongItemList from "$lib/components/song-item-list.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props()

    let title = $state('')
</script>

<div>
    <h1 class="page-title">Playlists</h1>
    <form method="POST" class="flex items-center gap-2">
        <input type="text" name="title" placeholder="Your playlist name" bind:value={title} class="bg-slate-900 py-2 px-3 rounded-md text-slate-600 outline-none border-2 border-transparent focus:text-white focus:border-slate-600">
        <input type="submit" value="Create">
    </form>
    <PlaylistList>
        {#each data.playlists as playlist}
            <div class="flex items-center justify-start gap-10 p-4 rounded-md hover:bg-gray-900">
                <a href="/playlists/{playlist.id}">{playlist.title}</a>
            </div>
        {/each}
    </PlaylistList>
</div>