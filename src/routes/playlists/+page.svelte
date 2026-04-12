<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageProps } from "./$types";
    import api from "$lib/plugins/api";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import PlaylistList from "$lib/components/playlist-list.svelte";
    import trashIcon from "$lib/assets/icons/trash.svg?raw"

    let { data }: PageProps = $props()

    let title = $state('')

    function deletePlaylist(playlistId: string){
        api.delete(`/playlists/${playlistId}`)
        .then(() => toast.success('Playlist removed'))
        .catch(() => toast.error('Failed to remove playlist'))
        .finally(invalidateAll)
    }

</script>

<div class="w-full sm:w-10/12 sm:mx-auto">
    <h1 class="page-title not-sm:text-center">Playlists</h1>
    <form method="POST" class="flex flex-wrap items-center gap-2 mb-4 has-[.input:focus]:text-white" use:enhance>
        <input type="text" name="title" placeholder="Your playlist name" bind:value={title} class="input bg-neutral-medium w-full sm:w-fit py-2 px-3 rounded-md outline-none border-2 border-transparent focus:border-neutral-lighter">
        <input type="submit" value="Create" class="w-full mx-auto sm:w-fit sm:mx-0">
    </form>
    <PlaylistList>
        {#each data.playlists as playlist (playlist.id)}
            <div class="flex items-center justify-between gap-10 p-4 rounded-md hover:bg-neutral-medium">
                <a href="/playlists/{playlist.id}">{playlist.title}</a>
                <button class="text-white cursor-pointer hover:bg-neutral-light hover:text-red-400 p-2 rounded-md" onclick={() => deletePlaylist(playlist.id || '')}>
                    {@html trashIcon}
                </button>
            </div>
        {/each}
    </PlaylistList>
</div>