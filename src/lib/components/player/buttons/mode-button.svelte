<script lang="ts">
    import { songQueue } from "$lib/stores/queue";
    import Icon from "@iconify/svelte";
</script>

{#if $songQueue.loopMode === "repeat-off"}
    <button
        class="cursor-pointer"
        title="No repeat"
        onclick={() => ($songQueue.loopMode = "repeat-all")}
    >
        <Icon icon="tabler:repeat-off" class="size-6" />
    </button>
{/if}

{#if $songQueue.loopMode === "repeat-all"}
    <button
        class="cursor-pointer"
        title="Repeat all"
        onclick={() => ($songQueue.loopMode = "repeat-one")}
    >
        <Icon icon="tabler:repeat" class="size-6" />
    </button>
{/if}

{#if $songQueue.loopMode === "repeat-one"}
    <button
        class="cursor-pointer"
        title="Repeat one"
        onclick={() => ($songQueue.loopMode = "repeat-off")}
    >
        <Icon icon="tabler:repeat-once" class="size-6" />
    </button>
{/if}
