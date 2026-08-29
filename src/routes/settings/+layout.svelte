<script lang="ts">
    import { type Snippet } from "svelte";
    import type { PageProps } from "../$types";
    import activeTab from "$lib/stores/activeTab";
    import libraryIcon from "$lib/assets/icons/library.svg?raw"
    import appearanceIcon from "$lib/assets/icons/appearance.svg?raw"

    let { children }: PageProps & { children: Snippet } = $props()

    
</script>

<h1
    class="page-title w-full text-center sm:text-start sm:mx-auto text-highlight"
>
    Settings
</h1>

<div class="flex w-full sm:text-start sm:mx-auto gap-2">
    <div class="flex flex-col gap-4 p-2 h-fit sticky top-0 border border-border rounded-lg">
        <a 
        href="/settings/appearance"
        class="tab-item"
        class:active={$activeTab === 'appearance'}
        >
            <div class="size-6">{@html appearanceIcon}</div>
            Appearance
        </a>

        <a 
        href="/settings/library" 
        class="tab-item"
        class:active={$activeTab === 'library'}
        >
            <div class="size-6">{@html libraryIcon}</div>
            Library
        </a>
    </div>


    <div class=" space-y-4 p-4 border border-border rounded-lg w-full">
        {@render children()}
    </div>
</div>

<style>
    .tab-item{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-align: center;
        padding: 1rem 0.5rem;
        border-radius: 10px;
    }

    .active{
        background-color: var(--color-bg-active);
    }
</style>