<script lang="ts">
    import { env } from "$env/dynamic/public";
    import { currentSong, currentTime } from "$lib/stores/player";

    type UnsyncedLyrics = string[];
    type SyncedLyrics = { time: number; text: string }[];

    type LyricResponse =
        | { synced: false; lyrics: UnsyncedLyrics }
        | { synced: true; lyrics: SyncedLyrics };

    let unsyncedLyrics = $state<UnsyncedLyrics>([]);
    let syncedLyrics = $state<SyncedLyrics>([]);
    let synced = $state<boolean>(false);
    let hasLyrics = $state(false);

    let currentLine = $derived(
        syncedLyrics.findIndex((line) => line.time >= $currentTime) - 1,
    );

    let syncedElements = $state<HTMLElement[]>([]);

    $effect(() => {
        const element = syncedElements[currentLine];
        if (element) {
            element.scrollIntoView({ block: "center", behavior: "smooth" });
        }
    });

    $effect(() => {
        const song = $currentSong
        if (!song?.id) {
            unsyncedLyrics = [];
            syncedLyrics = []
            return;
        }


        (async () => {
            try{
                const response = await fetch(`/media/songs/${$currentSong?.id}/lyrics`)
                console.log(response.ok)
                if(!response.ok){
                    unsyncedLyrics = []
                    syncedLyrics = []
                    hasLyrics = false
                    return
                }
                
                const data: LyricResponse = await response.json() satisfies LyricResponse

                synced = data.synced
                if(data.synced){
                    syncedLyrics = data.lyrics
                }else{
                    unsyncedLyrics = data.lyrics
                }

                hasLyrics = true


            }catch(e){
                unsyncedLyrics = []
                syncedLyrics = []
                hasLyrics = false
            }
        })()
    });
</script>

{#if hasLyrics}
    {#if synced}
        <div class="flex flex-col items-center gap-2" style="--colorful: {$currentSong?.color}">
            {#each syncedLyrics as lyric, line}
                <button
                    bind:this={syncedElements[line]}
                    class="w-fit text-2xl text-legend transition-all cursor-pointer"
                    class:active={currentLine === line}
                    onclick={() => currentTime.set(lyric.time)}
                >
                    {lyric.text}
                </button>
            {/each}
        </div>
    {:else}
        {#each unsyncedLyrics as lyric}
            <p class="text-center text-2xl text-subheading">{lyric}</p>
        {/each}
    {/if}
{:else}
    <div class="flex items-center justify-center size-full">
        <p class="text-5xl">No lyrics for this song</p>
    </div>
{/if}

<style>
    .active{
        color: var(--colorful);
        font-size: xx-large;
    }

</style>
