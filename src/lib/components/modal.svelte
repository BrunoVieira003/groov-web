<script lang="ts">
    import type { Snippet } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { portal } from "$lib/plugins/portal";

    interface PropsType{
        children: Snippet
        open?: boolean
        title?: string
    }

    let {open = $bindable(false), title, children}: PropsType = $props()

    export function hide(){ open = false}
    export function show(){ open = true}
    export function toggle(){ open = !open}

    const uid = $props.id()
    const titleId = `modal-title-${uid}`

    // only close when the press *and* the release happen on the backdrop,
    // so selecting text inside the dialog and releasing outside doesn't close it
    let pressedOnBackdrop = false

    function handleBackdropPointerDown(e: PointerEvent){
        pressedOnBackdrop = e.target === e.currentTarget
    }

    function handleBackdropClick(e: MouseEvent){
        if (pressedOnBackdrop && e.target === e.currentTarget) hide()
        pressedOnBackdrop = false
    }

    function handleKeydown(e: KeyboardEvent){
        if (open && e.key === 'Escape') hide()
    }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        onpointerdown={handleBackdropPointerDown}
        onclick={handleBackdropClick}
        transition:fade={{ duration: 100 }}
        {@attach portal}
    >
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            class="flex flex-col w-full max-w-lg max-h-[85dvh] rounded-lg bg-surface border border-border shadow-elevated"
            transition:scale={{ duration: 100, start: 0.95 }}
        >
            {#if title}
                <h2 id={titleId} class="shrink-0 text-heading text-xl px-4 py-2 border-b border-border">{title}</h2>
            {/if}
            <div class="modal-body flex-1 min-h-0 overflow-y-auto p-4">
                {@render children()}
            </div>
        </div>
    </div>
{/if}

<style>
    .modal-body{
        scrollbar-width: thin;
        scrollbar-color: var(--color-border) transparent;
    }
</style>
