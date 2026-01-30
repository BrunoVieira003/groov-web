<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import { currentSong } from "$lib/stores/currentSong";

    

    let coverArtURL = $derived(() => {
        if(!$currentSong){
            return 'https://robohash.org/groov'
        }

        return `${PUBLIC_API_URL}/songs/${$currentSong.id}/cover`
    })

</script>


{#if $currentSong}
<div class="flex flex-col gap-4 w-fit items-stretch mx-auto">
    <img src={coverArtURL()} alt="cover_art" class="aspect-square! self-center size-120 rounded-xl">
    <div class="flex items-center justify-between mx-2">
        <div>
            <p class="text-lg font-bold">{$currentSong?.title}</p>
            <div class="flex gap-1">
                {#each $currentSong?.authors as author}
                    <a class="text-xs hover:underline not-last:after:content-[',']" href="/artists/{author.id}">{author.name}</a>
                {/each}
            </div>
        </div>
        <div>
            <p>{$currentSong?.year}</p>
        </div>
    </div>
</div>
{/if}
