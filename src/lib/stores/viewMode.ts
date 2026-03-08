import { get, writable } from "svelte/store";

type ViewMode = 'default' | 'full'

export const viewMode = writable<ViewMode>('default')

export function toggleViewMode(){
    if(get(viewMode) === 'default'){
        viewMode.set('full')
    }else{
        viewMode.set('default')
    }
}