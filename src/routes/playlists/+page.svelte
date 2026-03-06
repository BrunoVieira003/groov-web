<script lang="ts">
    import { enhance } from "$app/forms";
    import Icon from "@iconify/svelte";
    import type { PageProps } from "./$types";
    import api from "$lib/plugins/api";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import PlaylistList from "$lib/components/playlist-list.svelte";

    let { data }: PageProps = $props()

    let title = $state('')

    function deletePlaylist(playlistId: string){
        api.delete(`/playlists/${playlistId}`)
        .then(() => toast.success('Playlist removed'))
        .catch(() => toast.error('Failed to remove playlist'))
        .finally(invalidateAll)
    }

</script>

<div>
    <h1 class="page-title">Playlists</h1>
    <form method="POST" class="flex items-center gap-2 mb-4" use:enhance>
        <input type="text" name="title" placeholder="Your playlist name" bind:value={title} class="bg-slate-900 py-2 px-3 rounded-md text-slate-600 outline-none border-2 border-transparent focus:text-white focus:border-slate-600">
        <input type="submit" value="Create">
    </form>
    <PlaylistList>
        {#each data.playlists as playlist (playlist.id)}
            <div class="flex items-center justify-between gap-10 p-4 rounded-md hover:bg-gray-900">
                <a href="/playlists/{playlist.id}">{playlist.title}</a>
                <button class="cursor-pointer hover:bg-gray-800 p-2 rounded-md" onclick={() => deletePlaylist(playlist.id || '')}>
                    <Icon icon='mdi:trash-outline' width='32' height='32'/>
                </button>
            </div>
        {/each}
    </PlaylistList>
</div>