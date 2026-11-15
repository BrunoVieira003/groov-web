<script lang="ts">
    import playlistStore from "$lib/stores/playlistList";
    import PlaylistItem from "../playlist-item.svelte";

    interface Props{
        onPick: (playlistId: string) => void
    }

    let { onPick }: Props = $props()
</script>

<!-- no height limit here: the modal body is the scroll container -->
<div class="flex flex-col bg-bg-hover/40 rounded-md p-1">
    {#each $playlistStore.items as playlist (playlist.id)}
        <PlaylistItem {playlist} deletable={false} onclick={() => onPick(playlist.id || '')}/>
    {:else}
        <p class="px-4 py-2 w-full text-legend">
            No playlists found.
            <a href="/playlists" class="text-heading hover:underline">Create one</a>
        </p>
    {/each}
</div>
