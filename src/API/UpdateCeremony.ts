import { API_URL } from "../constants/environment";
import { ILocation } from "../models/ILocation";
import { ICeremonyResponse } from "./GetCeremony";
import { createJsonPatch } from "./JsonPatch";
import getAuthHeaders from "./SetAuthHeaders";


export interface ICeremonyUpdate {
    id: number
    startDate: string //C# formatted DateTime
    endDate: string //C# formatted DateTime
    description: string
    location: ILocation
    weddingId: number
}

export interface IPatchCeremonyResponse {
    original: ICeremonyResponse
    patched: ICeremonyResponse
}


export async function updateCeremonyRequest(ceremony : ICeremonyUpdate, id : string) : Promise<ICeremonyUpdate> {
    
    console.log("CEREMONY before patch creation")
    console.log(ceremony)
    var patches = createJsonPatch(ceremony);
    console.log("CEREMONY AFTER PATCHMADE")
    console.log(patches)

    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/ReligiousCeremony/${id}`, {
       headers,
       method: "PATCH",
       body: JSON.stringify(patches)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IPatchCeremonyResponse;
    console.log("PATCHED updateCeremony")
    console.log(data)
    return data.patched;
}

