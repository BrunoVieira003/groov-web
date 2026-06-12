export function formatSongTime(seconds: number, enabled=true) {
    if(!enabled){
        return '-:--'
    }
    const date = new Date(1970, 0, 1, 0, 0, seconds)
    return `${date.getMinutes()}:${date.getSeconds().toString().padStart(2, '0')}`
}

export function formatAlbumDuration(seconds: number){
    const hours = Math.floor(seconds / (3600))
    const minutes = Math.floor(seconds / 60) - (60 * hours)

    let result = ''
    if(hours >= 1){
        result += hours + ' hr '
    }

    result += minutes + ' min'

    return result
}