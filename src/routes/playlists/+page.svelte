<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageProps } from "./$types";
    import toast from "svelte-hot-french-toast";
    import { goto, invalidateAll } from "$app/navigation";
    import PlaylistList from "$lib/components/playlist-list.svelte";
    import PlaylistItem from "$lib/components/playlist-item.svelte";

    let { data }: PageProps = $props()

    let title = $state('')

</script>


<h1 class="page-title text-heading not-sm:text-center">Playlists</h1>
<form method="POST" class="flex flex-wrap items-center gap-2 mb-4 has-[.input:focus]:text-heading" use:enhance>
    <input type="text" name="title" placeholder="Your playlist name" bind:value={title} class="text-heading bg-surface w-full sm:w-fit py-2 px-3 rounded-md outline-none border-2 border-transparent focus:border-surface-active">
    <input type="submit" value="Create" class="w-full text-heading mx-auto sm:w-fit sm:mx-0">
</form>
<PlaylistList>
    {#each data.playlists as playlist (playlist.id)}
        <PlaylistItem {playlist} onclick={() => goto(`/playlists/${playlist.id}`)}/>
    {/each}
</PlaylistList>