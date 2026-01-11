export function formatSongTime(seconds: number, enabled=true) {
    if(!enabled){
        return '-:--'
    }
    const date = new Date(1970, 0, 1, 0, 0, seconds)
    return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`
}