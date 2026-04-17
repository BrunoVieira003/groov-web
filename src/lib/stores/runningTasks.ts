import { PUBLIC_API_URL } from "$env/static/public";
import { writable } from "svelte/store";

export interface Task{
    id: string
    progress: number
    status: string
    label: string
}

export type TaskType = 'scan-folder' | 'upload' | 'prune-songs' | 'prune-assets'

export const runningTasks = writable<Task[]>([])

export function trackTask(taskType: TaskType, id: string, label: string) {
    const events = new EventSource(`${PUBLIC_API_URL}/tasks/${taskType}/${id}`)
    const task: Task = {
        id: id,
        progress: 0,
        status: 'started',
        label
    }

    runningTasks.update((state) => {
        return [...state, task]
    })

    events.onmessage = (event) => {
        const data = JSON.parse(String(event.data).replace('data: ', ''))

        switch(data.status){
            case 'running':
                runningTasks.update((state) => {
                    task.progress = data.progress
                    task.status = data.status
                    const index = state.findIndex(t => t.id === task.id)
                    state[index] = task
                    return state
                })

                break

            case 'done':
                runningTasks.update((state) => {
                    task.status = 'done'
                    const index = state.findIndex(t => t.id === task.id)
                    state[index] = task
                    return state
                })

                setTimeout(() => runningTasks.update((state) => state.filter(t => t.id !== task.id)), 3000)
                break

            case 'failed':
                task.status = "failed"
                events.close()
                break
        }
    }
}