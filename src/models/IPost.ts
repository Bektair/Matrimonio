import { IImage } from "./IImage"

export interface IPost {
    id: number,
    title: string,
    body: string,
    wedding_id: number,
    author_id: number,
    images: IImage[]
    language: string
}
