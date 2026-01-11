import { writable } from "svelte/store";

interface QueueState{
    paused: boolean,
    mode: 'default' | 'repeat-one'
}

const defaultValues: QueueState = {
    paused: true,
    mode: 'default'
}

function createQueueStateStore(){
    const store = writable<QueueState>(defaultValues)
    return {
        ...store,
        togglePlay: () => store.update((stored) => {
            return {
                ...stored, 
                paused: !stored.paused
            }
        }),
        toggleMode: () => store.update((stored) => {
            return {
                ...stored,
                mode: stored.mode === 'default' ? 'repeat-one' : 'default'
            }
        }),
    }
}

export const queueState = createQueueStateStore();