export default interface Song{
    id?: string,
    title: string,
    year?: number,
    createdAt: string,
    updatedAt: string,
    authors: {
        id: string,
        name: string
    }[]
}