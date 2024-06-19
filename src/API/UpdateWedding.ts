import { API_URL } from "../constants/environment"
import { IWeddingResponse } from "./GetWeddings"
import { createJsonPatch } from "./JsonPatch"
import getAuthHeaders from "./SetAuthHeaders"

export interface IWeddingUpdate {
    Description: string | undefined
    Dresscode: string | undefined
    MainColor: string | undefined
    SecoundaryColor: string | undefined
    MainFontColor: string | undefined
    SecoundaryFontColor: string | undefined
    BackgroundImage: string | undefined
    BodyFont: string | undefined
    HeadingFont: string | undefined
}

export interface IPatchWeddingResponse {
    original: IWeddingResponse
    patched: IWeddingResponse
}

export async function patchWedding(rsvp : IWeddingUpdate, id : string){

    var patches = createJsonPatch(rsvp);
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/Wedding/${id}`, {
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