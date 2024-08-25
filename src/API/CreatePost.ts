import { API_URL } from "../constants/environment"
import { IImage } from "../models/IImage"
import { IPostResponse } from "./GetPosts"
import getAuthHeaders from "./SetAuthHeaders"

export interface IPostCreate {
    Title : string 
    Body : string
    AuthorId : string
    WeddingId : string
    Language : string
    IsDefaultLanguage : boolean
    Images: IImage[]
}


export async function createPost(postCreate : IPostCreate){
    const headers = await getAuthHeaders();
    const test = JSON.stringify(postCreate);
    
    console.log("......................CreatedRSVPUsing.................")
    console.log(test)
    let response = await fetch(`${API_URL}/api/Post`, {
        headers,
        method: "POST",
        body: JSON.stringify(postCreate)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IPostResponse;
    return data;
}
