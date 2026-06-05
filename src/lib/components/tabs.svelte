<script lang="ts">
    import type { Snippet } from "svelte";

    interface PropsType{
        currentTab?: string
        tabs: string[]
        children: Snippet
    }

    let {currentTab = $bindable(), tabs, children}: PropsType = $props()
</script>

<div class="flex flex-col w-full justify-stretch">
    <div class="flex w-full justify-stretch items-stretch h-min z-10">
        {#each tabs as tab}
            <button 
            class="text-lg text-subheading text-center p-2 border-b-2 border-neutral-medium data-[active=true]:border-legend data-[active=true]:text-heading"
            data-active={tab === currentTab}
            onclick={() => {currentTab = tab}}
            >
                {tab}
            </button>
        {/each}
        <span class="flex-1 p-2 border-b-2 border-neutral-medium"></span>
    </div>
    <div>
        {@render children()}
    </div>
</div>