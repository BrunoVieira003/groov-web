<script lang="ts">
    import { PUBLIC_API_URL } from "$env/static/public";
    import api from "$lib/plugins/api";
    import { currentSong, currentTime } from "$lib/stores/player";

    type UnsyncedLyrics = string[]
    type SyncedLyrics = {time: number, text: string}[]

    type LyricResponse = {synced: false, lyrics: UnsyncedLyrics} | {synced: true, lyrics: SyncedLyrics}

    let unsyncedLyrics = $state<UnsyncedLyrics>([])
    let syncedLyrics = $state<SyncedLyrics>([])
    let synced = $state<boolean>(false)
    let hasLyrics = $state(false)

    let currentLine = $derived(syncedLyrics.findIndex(line => line.time >= $currentTime) - 1)

    let syncedElements = $state<HTMLElement[]>([])

    $effect(() => {
        const element = syncedElements[currentLine]
        if(element){
            element.scrollIntoView({block: 'center' ,behavior: 'smooth'})
            
        }
    })
    

    $effect(() => {
        if(!$currentSong || !$currentSong.id){
            unsyncedLyrics = []
            return
        }

        api.get<LyricResponse>(`${PUBLIC_API_URL}/songs/${$currentSong?.id}/lyrics`)
        .then((response) => {
            if(response.data.synced){
                syncedLyrics = response.data.lyrics
            }else{
                unsyncedLyrics  = response.data.lyrics
            }

            synced = response.data.synced
            hasLyrics = true
        })
        .catch(() => {
            unsyncedLyrics = []
            syncedLyrics = []
            hasLyrics = false
        })
    })
</script>

{#if hasLyrics}
    {#if synced}
        <div class="flex flex-col items-center gap-2">
            {#each syncedLyrics as lyric, line}
                <button
                bind:this={syncedElements[line]}
                class="w-fit text-2xl text-legend data-[active=true]:text-highlight transition-all cursor-pointer"
                data-active="{currentLine === line}"
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