<script lang="ts">
    import currentContextMenu from "$lib/stores/currentContextMenu";
    import { onClickOutside } from "runed";
    import { tick } from "svelte";
    import { fade } from "svelte/transition";

    export type ContextAction = { label: string; cmd: Function };

    interface PropsType {
        actions: ContextAction[];
        afterExecute?: Function;
    }

    let { actions, afterExecute = () => {} }: PropsType = $props();

    let open = $state(false);
    let container = $state<HTMLElement>();

    let pos = $state({ x: 0, y: 0 });
    let browser = $state({ w: 0, h: 0 });

    onClickOutside(() => container, hide);

    export async function show(event: MouseEvent) {
        event.preventDefault();
        if ($currentContextMenu && $currentContextMenu.hide !== hide) {
            $currentContextMenu.hide();
        }

        const x = event.clientX;
        const y = event.clientY;

        pos = { x, y };
        open = true;
        $currentContextMenu = { hide };

        await tick();
        if (!container) return;

        const w = container.offsetWidth;
        const h = container.offsetHeight;

        pos = {
            x: browser.w - x < w ? Math.max(0, x - w) : x,
            y: browser.h - y < h ? Math.max(0, y - h) : y,
        };
    }

    export function hide() {
        open = false;
    }

    export function toggle(event: MouseEvent) {
        if (open) {
            hide();
        } else {
            show(event);
        }
    }
</script>

<svelte:window bind:innerWidth={browser.w} bind:innerHeight={browser.h} />

{#if open}
    <div
        class="flex flex-col bg-surface fixed z-50 shadow-md shadow-shadow p-1 border border-border rounded-lg"
        style="top: {pos.y}px; left: {pos.x}px;"
        bind:this={container}
        transition:fade={{ duration: 50 }}
    >
        {#each actions as action}
            <button
                onclick={() => {
                    action.cmd();
                    afterExecute();
                }}
                class="px-4 py-2 cursor-pointer rounded-md text-heading bg-surface hover:bg-surface-hover text-start"
            >
                {action.label}
            </button>
        {/each}
    </div>
{/if}
