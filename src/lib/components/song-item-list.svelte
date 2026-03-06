<script lang="ts">
    import { setCollectionContext } from "$lib/contexts/collection-context";
    import { type Snippet } from "svelte";

    interface props{
        collectionId: string
        collectionType: 'artist' | 'playlist'
        children: Snippet
    }

    let props: props = $props()
    setCollectionContext({collectionId: props.collectionId, collectionType: props.collectionType})
</script>

<div class="flex flex-col w-full max-h-155 overflow-y-auto">
    {@render props.children()}
</div>

<style>
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #24262c;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #434652;
    }
</style>