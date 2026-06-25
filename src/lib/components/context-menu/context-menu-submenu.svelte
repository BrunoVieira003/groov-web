<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";
    import RightArrowIcon from '$lib/assets/icons/right-arrow.svg?raw'

    interface PropsType{
        children: Snippet
        label: string
        labelClass?: ClassValue
        title?: string
    }

    let {children, label, labelClass, title}: PropsType = $props()

    let active = $state(false)
</script>


<button class="relative text-heading" onmouseenter={() => active = true} onmouseleave={() => active = false}>
    <div class={["flex w-full items-center justify-between px-4 py-2 rounded-md hover:bg-neutral-light cursor-pointer text-heading", labelClass]}>
        <p>{label}</p>
        <div class="size-4">{@html RightArrowIcon}</div>
    </div>
    {#if active}
        
        <div class="absolute bg-neutral-medium rounded-lg align-middle right-0 top-0 translate-x-full border border-neutral-light">
            {#if title}
                <p class="font-semibold text-legend text-sm py-2 px-4 -mb-1 w-full mx-auto">{title}</p>
            {/if}
            {@render children()}
        </div>
    {/if}
</button>