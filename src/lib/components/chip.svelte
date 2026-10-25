<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props{
        active?: boolean
        children: Snippet
    }

    let {active = $bindable(false), children}: Props = $props()
</script>

<button class="py-1 px-3 text-legend bg-surface opacity-90 w-fit text-sm rounded-lg cursor-pointer" class:active={active} onclick={() => active = !active}>
    {@render children()}
</button>

<style>
    .active{
        background-color: var(--color-surface-active);
        color: var(--color-heading);
        opacity: 100%;
    }
</style>