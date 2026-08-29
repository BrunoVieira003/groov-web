<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";
    import RightArrowIcon from '$lib/assets/icons/right-arrow.svg?raw'

    interface PropsType{
        children: Snippet
        label: string
        labelClass?: ClassValue
    }

    let {children, label, labelClass}: PropsType = $props()

    let active = $state(false)
</script>


<button class="relative text-heading" onmouseenter={() => active = true} onmouseleave={() => active = false}>
    <div class={["flex w-full items-center justify-between px-4 py-2 rounded-md bg-surface hover:bg-surface-hover cursor-pointer text-heading", labelClass]}>
        <p>{label}</p>
        <div class="size-4">{@html RightArrowIcon}</div>
    </div>
    {#if active}
        
        <div class="absolute bg-surface rounded-lg align-middle right-0 top-0 translate-x-full border border-border">
            {@render children()}
        </div>
    {/if}
</button>