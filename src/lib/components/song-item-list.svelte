<script lang="ts">
    import { setCollectionContext, type CollectionType } from "$lib/contexts/collection-context";
    import { type Snippet } from "svelte";

    interface props{
        collectionId?: string
        collectionType?: CollectionType
        children: Snippet
    }

    let props: props = $props()
    setCollectionContext({collectionId: props.collectionId || '', collectionType: props.collectionType || 'other'})
</script>

<div class="relative flex flex-col w-full">
    <div class="sticky w-full -top-6 bg-gray-950 grid grid-cols-1 md:grid-cols-2 items-center justify-start gap-2 p-4">
        <p class="font-bold text-sm opacity-80">Title</p>
        <p class="hidden md:block font-bold text-sm opacity-80">Album</p>
    </div>
    {@render props.children()}
</div>