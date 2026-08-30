<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";

    let {children, class: classValue, ...props}: HTMLButtonAttributes = $props()
</script>

<button
    class={["px-4 py-2 cursor-pointer rounded-md text-heading bg-surface hover:bg-surface-hover text-start", classValue]} {...props}>
    {#if children} 
        {@render children()}
    {/if}
    </button
>