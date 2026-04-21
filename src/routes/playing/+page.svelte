<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { songQueue } from "$lib/stores/queue";
    import emptyImage from "$lib/assets/images/empty.png";
    import ArtistsLabel from "$lib/components/artists-label.svelte";
    import Marquee from "$lib/components/marquee.svelte";
    import SongList from "$lib/components/song-list.svelte";
    import { currentSong } from "$lib/stores/player";

    // svelte-ignore non_reactive_update
    let coverImage: HTMLImageElement;

    let coverArtURL = $derived(() => {
        if (!$currentSong) {
            return "https://robohash.org/groov";
        }

        return `${env.PUBLIC_API_URL}/songs/${$currentSong.id}/cover`;
    });

    let collectionLink = $derived(() => {
        switch ($songQueue.collection?.type) {
            case "artist":
                return `/artists/${$songQueue.collection.id}`;
            case "album":
                return `/albums/${$songQueue.collection.id}`;
            case "playlist":
                return `/playlists/${$songQueue.collection.id}`;
            default:
                return "";
        }
    });
</script>

{#if $currentSong}
    <div
        class="flex flex-col mt-6 gap-4 w-10/12 mx-auto sm:w-4/12"
        style="--colorful: {$currentSong.color}; --colorful-glow: {$currentSong.color}4D;"
    >
        {#if $songQueue.collection?.name}
            <div class="-mb-2">
                <p class="text-sm text-legend">
                    Playing from {$songQueue.collection.type}
                </p>
                <a href={collectionLink()} class="text-lg text-heading"
                    >{$songQueue.collection.name}</a
                >
            </div>
        {/if}
        <img
            bind:this={coverImage}
            src={coverArtURL()}
            alt="cover_art"
            class:colorful-glow={!!$currentSong.color}
            class="sm:max-w-120 rounded-xl object-cover white-glow"
            onerror={() => (coverImage.src = emptyImage)}
        />
        <div
            class="flex items-center justify-between w-full sm:w-120 overflow-hidden"
        >
            <div
                class="w-full data-hasYear:w-10/12"
                data-hasYear={$currentSong.year}
            >
                <Marquee>
                    <p class="colorful text-xl font-bold">
                        {$currentSong?.title}
                    </p>
                </Marquee>
                <ArtistsLabel artists={$currentSong?.authors || []} />
            </div>
            <div class="w-fit">
                <p class="text-legend">{$currentSong?.year}</p>
            </div>
        </div>
    </div>
    <div class="mt-20 w-11/12 sm:w-11/12 mx-auto">
        <h1 class="text-xl mb-4">Queue</h1>
        <SongList
            collection={$songQueue.collection}
            tracks={$songQueue.tracks}
        />
    </div>
{/if}

<style>
    .colorful {
        color: var(--colorful);
    }

    .colorful-glow {
        -webkit-box-shadow: 0px 0px 300px 0px var(--colorful-glow);
        -moz-box-shadow: 0px 0px 300px 0px var(--colorful-glow);
        box-shadow: 0px 0px 300px 0px var(--colorful-glow);
    }
</style>
