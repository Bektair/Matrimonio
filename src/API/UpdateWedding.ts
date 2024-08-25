import { API_URL } from "../constants/environment"
import { IWeddingResponse } from "./GetWeddings"
import { createJsonPatch } from "./JsonPatch"
import getAuthHeaders from "./SetAuthHeaders"

export interface IWeddingUpdate {
    PrimaryColor: string | undefined
    SecoundaryColor: string | undefined
    PrimaryFontColor: string | undefined
    SecoundaryFontColor: string | undefined
    BackgroundImage: string | undefined
    BodyFont: string | undefined
    HeadingFont: string | undefined
    Picture: string
    Translation: IWeddingUpdateTranslation
}

export interface IWeddingUpdateTranslation {
    Description: string
    Dresscode: string 
    Title: string
}

export interface IPatchWeddingResponse {
    original: IWeddingResponse
    patched: IWeddingResponse
}

export async function patchWedding(weddingUpdate : IWeddingUpdate, id : string, language: string){
    var patches = createJsonPatch(weddingUpdate);
    console.log("WEDDING PATCHES!......................................Wedding patches")
    console.log(patches)

    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/Wedding/${id}?language=${language}`, {
        headers,
        method: "PATCH",
        body: JSON.stringify(patches)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);

        let data = await response.json();
        console.log(data)
        console.log("DATASearchMe")
        data = data as IPatchWeddingResponse;
     
     return data.patched; //Will return original and patched version, we want patched aka index 1
}