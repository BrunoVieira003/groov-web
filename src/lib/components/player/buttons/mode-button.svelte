<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import repeatOffIcon from "$lib/assets/icons/repeat-off.svg?raw"
    import repeatAllIcon from "$lib/assets/icons/repeat-all.svg?raw"
    import repeatOneIcon from "$lib/assets/icons/repeat-one.svg?raw"
</script>

{#if $songQueue.loopMode === "repeat-off"}
    <button
        class="cursor-pointer"
        title="No repeat"
        onclick={() => ($songQueue.loopMode = "repeat-all")}
    >
        <div class="size-6 text-white">
            {@html repeatOffIcon}
        </div>
    </button>
{/if}

{#if $songQueue.loopMode === "repeat-all"}
    <button
        class="cursor-pointer"
        title="Repeat all"
        onclick={() => ($songQueue.loopMode = "repeat-one")}
    >
        <div class="size-6 text-white">
            {@html repeatAllIcon}
        </div>
    </button>
{/if}

{#if $songQueue.loopMode === "repeat-one"}
    <button
        class="cursor-pointer"
        title="Repeat one"
        onclick={() => ($songQueue.loopMode = "repeat-off")}
    >
        <div class="size-6 text-white">
            {@html repeatOneIcon}
        </div>
    </button>
{/if}
