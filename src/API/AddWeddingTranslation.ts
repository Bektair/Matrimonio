import { API_URL } from "../constants/environment"
import getAuthHeaders from "./SetAuthHeaders"

export interface ITranslation {
    language:string,
    isDefaultLanguage: boolean
    title:string,
    description:string,
    dresscode:string,
    rsvpBody: string
}

export interface IAddWeddingTranslation {
    translation: ITranslation
    weddingId: string
}

export async function addWeddingTranslation(translationRequest : IAddWeddingTranslation){
    const headers = await getAuthHeaders()
    let response = await fetch(`${API_URL}/api/Wedding/${translationRequest.weddingId}/translation`, {
        method: "POST",
        headers,
        body: JSON.stringify(translationRequest.translation)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    return;
}