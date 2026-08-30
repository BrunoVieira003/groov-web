<script lang="ts">
    import { onClickOutside } from "runed";
    import type { Snippet } from "svelte";

    interface PropsType{
        children: Snippet
        open?: boolean
    }

    let {open = $bindable(false), children}: PropsType = $props()

    export function hide(){ open = false}
    export function show(){ open = true}
    export function toggle(){ open = !open}

    let container = $state<HTMLElement>()

    onClickOutside(() => container, () => open = false)
</script>

{#if open}
    <div class="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-[#000000b0]">
        <div class="p-4 w-1/2 rounded-lg bg-surface" bind:this={container}>
            {@render children()}
        </div>
    </div>
{/if}