<script lang="ts">
    import { goto } from "$app/navigation";
    import { viewMode } from "$lib/stores/viewMode";
    import type Artist from "$lib/types/artist";

    interface Props{
        artists: {id: string, name: string}[],
        size?: 'small' | 'default' | 'big'
    }

    let {artists, size = 'default'}: Props = $props()

    async function onClickArtist(artistId: string){
        viewMode.set('default')
        goto(`/artists/${artistId}`)
    }
</script>

<div class="flex gap-1 flex-wrap">
    {#each artists as artist}
        <button
        onclick={() => onClickArtist(artist.id)}
        class="cursor-pointer hover:underline not-last:after:content-[',']"
        class:default={size === 'default'}
        class:small={size === 'small'}
        class:big={size === 'big'}
        >
            {artist.name}
        </button>
    {/each}
</div>

<style>
    .default{
        font-size: 0.875rem;
    }

    .small{
        font-size: 0.75rem;
    }

    .big{
        font-size: 1.25rem;
    }
</style>