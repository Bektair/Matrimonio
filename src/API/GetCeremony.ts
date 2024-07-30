import { API_URL } from "../constants/environment";
import { ILocation } from "../models/ILocation";
import getAuthHeaders from "./SetAuthHeaders";




export interface ICeremonyResponse {
    id: number
    startDate: string //C# formatted DateTime
    endDate: string //C# formatted DateTime
    description: string
    location: ILocation
    weddingId: number
    language: string
    isDefaultLanguage: boolean
}

export interface CeremonyRequest{
    weddingId : string
    language: string
}

export async function fetchCeremonies(resonse : CeremonyRequest) : Promise<ICeremonyResponse[]> {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony?language${resonse.language}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ICeremonyResponse[];
    return data;
}

export async function fetchCeremony(req : CeremonyRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony?$filter=weddingId eq ${Number(req.weddingId)}&language=${req.language.toUpperCase()}`, {
       headers
    })
    
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ICeremonyResponse[];
 
    return data.length>0 ? data[0] : undefined;
}