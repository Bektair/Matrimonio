import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";




// export async function updatePost(params:any) {
    
// }

export interface IPostTranslationRequest{
    translation: IPostTranslation
    postId: string
}

export interface IPostTranslation {
    title: string,
    body: string,
    language: string,
    isDefaultLanguage: boolean
}


export async function addPostTranslation(req:IPostTranslationRequest) {
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/Post/${req.postId}/Translation`, {
        headers,
        method: "POST",
        body: JSON.stringify(req.translation)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
    return;
}