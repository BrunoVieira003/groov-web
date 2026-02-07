export default interface Song{
    id?: string
    title: string
    year?: number
    color?: string
    createdAt: string
    updatedAt: string
    authors: {
        id: string
        name: string
    }[]
}