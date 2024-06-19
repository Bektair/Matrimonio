import { API_URL } from "../constants/environment";
import { ILocation } from "../models/ILocation";
import getAuthHeaders from "./SetAuthHeaders";


interface IParams {
    weddingId: string
}

export interface ICeremonyResponse {
    id: number
    date: string //C# formatted DateTime
    description: string
    location: ILocation
    weddingId: number
}


export async function fetchCeremonies() : Promise<ICeremonyResponse[]> {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ICeremonyResponse[];
    return data;
}

export async function fetchCeremony({weddingId} : IParams) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony?$filter=weddingId eq ${Number(weddingId)}`, {
       headers
    })
    
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ICeremonyResponse[];
 
    return data.length>0 ? data[0] : undefined;
}