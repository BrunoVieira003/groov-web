<script lang="ts">
    import { onClickOutside } from "runed";
    import type { Snippet } from "svelte";

    interface PropsType{
        children: Snippet
        open?: boolean
        title?: string
    }

    let {open = $bindable(false), title, children}: PropsType = $props()

    export function hide(){ open = false}
    export function show(){ open = true}
    export function toggle(){ open = !open}

    let container = $state<HTMLElement>()

    onClickOutside(() => container, () => open = false)
</script>

{#if open}
    <div class="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[#000000b0]">
        <div class="w-1/2 h-9/12 flex flex-col rounded-lg bg-surface border border-border" bind:this={container}>
            {#if title}
                <h2 class="text-heading text-xl px-4 py-2 border-b border-border">{title}</h2>
            {/if}
            <div class="size-full p-4">
                {@render children()}
            </div>
        </div>
    </div>
{/if}