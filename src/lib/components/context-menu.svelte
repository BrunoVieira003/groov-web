<script lang="ts">
    import currentContextMenu from "$lib/stores/currentContextMenu";
    import { onClickOutside } from "runed";
    import { fade } from "svelte/transition";

    let { children } = $props();

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
        class="flex flex-col bg-neutral-medium rounded-md fixed z-50 shadow-md shadow-neutral-darker p-1 pt-0"
        style="top: {top}px; left: {left}px;"
        bind:this={container}
        transition:fade={{ duration: 50 }}
    >
        {@render children()}
    </div>
{/if}
