import { API_URL } from "../constants/environment";
import { IImage } from "../models/IImage";
import { IPostResponse } from "./GetPosts";
import { createJsonPatch } from "./JsonPatch";
import getAuthHeaders from "./SetAuthHeaders";

export interface IPostTranslationRequest{
    translation: IPostTranslation
    postId: string
    update: boolean
}

export interface IPostTranslation {
    title: string,
    body: string,
    language: string,
    isDefaultLanguage: boolean
}

export interface IPostUpdate {
    AuthorId : string
    WeddingId : string
    Images: IImage[]
    Translation: IPostUpdateTranslation
}

export interface IPostUpdateTranslation {
    Title : string
    Body : string
}

export interface PostUpdateRequest{
    Language : string
    update: IPostUpdate
    id: number
}

export interface IPatchPostResponse {
    original: IPostResponse
    patched: IPostResponse
}

export async function updatePost({update, id, Language} : PostUpdateRequest){
    console.log(update)
    var patches = createJsonPatch(update);
    console.log("Post PATCHES!......................................Wedding patches")
    console.log(patches)
    
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/Post/${id}?language=${Language}`, {
        headers,
        method: "PATCH",
        body: JSON.stringify(patches)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);

        let data = await response.json();
        console.log(data)
        console.log("DATASearchMe")
        data = data as IPatchPostResponse;
     
     return data.patched; //Will return original and patched version, we want patched aka index 1
}

export async function addPostTranslation(req:IPostTranslationRequest) {
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/Post/${req.postId}/Translation?update=${req.update}`, {
        headers,
        method: "POST",
        body: JSON.stringify(req.translation)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
    return;
}