import { API_URL } from "../constants/environment"
import { ICeremonyResponse } from "./GetCeremony"
import getAuthHeaders from "./SetAuthHeaders"

export interface ICeremonyRequest {
    startDate: string
    endDate: string
    description: string
    locationId: number
    weddingId: number
}

export async function createCeremony( ceremonyRequest : ICeremonyRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony`, {
        method: "POST",
        headers,
        body: JSON.stringify(ceremonyRequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ICeremonyResponse;
    return data;
}

export interface ITranslateCeremony{
    Language: string
    IsDefaultLanguage: boolean
    Description: string
}

export interface ITranslateCeremonyRequest {
    translate : ITranslateCeremony,
    ceremonyId: string
}

export async function addCeremonyTranslation(req : ITranslateCeremonyRequest){
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony/${req.ceremonyId}/Translation`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.translate)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    return;
}