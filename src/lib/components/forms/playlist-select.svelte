<script lang="ts">
    import { playlistList } from "$lib/stores/playlistList";

    interface Props{
        onPick: (playlistId: string) => void
    }

    let { onPick }: Props = $props()
</script>

<div class="flex flex-col items-start rounded-md bg-slate-800">
    {#each $playlistList.items as playlist (playlist.id)}
        <button
        class="cursor-pointer hover:bg-slate-700 p-4 last:rounded-b-md w-full text-start"
        value={playlist.id}
        onclick={() => onPick(playlist.id || '')}
        >
            {playlist.title}
        </button>
    {/each}
</div>