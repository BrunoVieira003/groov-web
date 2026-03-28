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
    <div class="sticky top-0 bg-gray-950 grid grid-cols-3 items-center justify-start gap-10 p-4">
        <p class="font-bold text-sm opacity-80">Title</p>
        <p class="font-bold text-sm opacity-80">Artist</p>
        <p class="font-bold text-sm opacity-80">Album</p>
    </div>
    {@render props.children()}
</div>