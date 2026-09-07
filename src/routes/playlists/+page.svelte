<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageProps } from "./$types";
    import toast from "svelte-hot-french-toast";
    import { invalidateAll } from "$app/navigation";
    import PlaylistList from "$lib/components/playlist-list.svelte";
    import trashIcon from "$lib/assets/icons/trash.svg?raw"
    import { fallbackImage } from "$lib/plugins/fallbackImage";

    let { data }: PageProps = $props()

    let title = $state('')

    function deletePlaylist(playlistId: string){
        fetch(`/api/playlists/${playlistId}`, {method: 'delete'})
        .then(() => toast.success('Playlist removed'))
        .catch(() => toast.error('Failed to remove playlist'))
        .finally(() => invalidateAll())
    }

</script>


<h1 class="page-title text-heading not-sm:text-center">Playlists</h1>
<form method="POST" class="flex flex-wrap items-center gap-2 mb-4 has-[.input:focus]:text-heading" use:enhance>
    <input type="text" name="title" placeholder="Your playlist name" bind:value={title} class="text-heading bg-surface w-full sm:w-fit py-2 px-3 rounded-md outline-none border-2 border-transparent focus:border-surface-active">
    <input type="submit" value="Create" class="w-full text-heading mx-auto sm:w-fit sm:mx-0">
</form>
<PlaylistList>
    {#each data.playlists as playlist (playlist.id)}
        <div class="grid grid-cols-[1fr_auto] items-center p-4 rounded-md hover:bg-bg-hover">
            <div class="flex items-center gap-4">
                <img
                src="/api/playlists/{playlist.id}/cover"
                alt="album_cover_art"
                class="aspect-square! self-center size-12 rounded-xl object-cover"
                {@attach fallbackImage}
                >
                <a class="text-subheading" href="/playlists/{playlist.id}">{playlist.title}</a>
            </div>
            <button class="text-heading cursor-pointer bg-surface hover:bg-surface-hover hover:text-danger p-2 rounded-md" onclick={() => deletePlaylist(playlist.id || '')}>
                {@html trashIcon}
            </button>
        </div>
    {/each}
</PlaylistList>