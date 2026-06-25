<script lang="ts">
    import currentContextMenu from "$lib/stores/currentContextMenu";
    import { onClickOutside } from "runed";
    import type { Snippet } from "svelte";
    import { fade } from "svelte/transition";

    interface PropsType{
        children: Snippet
        title?: string
    }

    let { children, title }: PropsType = $props();

    let open = $state(false);
    let top = $state(0);
    let left = $state(0);
    let container = $state<HTMLElement>();

    onClickOutside(() => container, hide);

    export function show(event: MouseEvent) {
        event.preventDefault()
        if($currentContextMenu && $currentContextMenu.hide !== hide){
            $currentContextMenu.hide()
        }

        top = event.y;
        left = event.x;
        open = true;

        $currentContextMenu = {hide}
    }

    export function hide(){
        open = false;
    }

    export function toggle(event: MouseEvent) {
        top = event.y;
        left = event.x;
        open = !open;
    }
</script>

{#if open}
    <div
        class="flex flex-col bg-neutral-medium fixed z-50 shadow-md shadow-neutral-darker p-1 pt-0 border border-neutral-light rounded-lg"
        style="top: {top}px; left: {left}px;"
        bind:this={container}
        transition:fade={{ duration: 50 }}
    >
        {#if title}
            <p class="font-semibold text-legend text-sm py-2 px-4 -mb-1 w-full mx-auto">{title}</p>
        {/if}
        {@render children()}
    </div>
{/if}
