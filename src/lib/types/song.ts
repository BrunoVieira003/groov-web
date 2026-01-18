export default interface Song{
    id?: string,
    title: string,
    year?: number,
    authors?: {
        artist: {
            id: string,
            name: string
        }
    }[]
}