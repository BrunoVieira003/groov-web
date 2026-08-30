<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import playlistStore from "$lib/stores/playlistList";


    interface Props{
        onPick: (playlistId: string) => void
    }

    let { onPick }: Props = $props()
</script>

<div class="flex flex-col items-start bg-surface rounded-md p-1 max-h-50 overflow-y-auto">
    {#each $playlistStore.items as playlist (playlist.id)}
        <button
        class="cursor-pointer text-content hover:bg-surface-hover px-4 py-2 w-full text-start rounded-md text-nowrap"
        value={playlist.id}
        onclick={() => onPick(playlist.id || '')}
        >
            {playlist.title}
        </button>
    {:else}
        <p class="px-4 py-2 w-full text-start text-nowrap text-legend rounded-md">No playlists found</p>
    {/each}
</div>

<style>
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-surface);
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-surface-hover);
    }
</style>