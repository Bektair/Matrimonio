import { API_URL } from "../constants/environment"
import { IMenuOrder } from "../models/IMenuOrder"
import { IRSVPResponse } from "./GetRSVP"
import { createJsonPatch } from "./JsonPatch"
import getAuthHeaders from "./SetAuthHeaders"

export interface IRSVPUpdate {
    body: string | undefined
    deadline: number | undefined
    status: string | undefined
    numberOfGuests: number | undefined
    OtherDietaryRequirements: string | undefined
    signerId: string | undefined
    weddingId: number | undefined
    menuOrders: IMenuOrder[] | undefined
}

export interface IPatchRSVPResponse {
    original: IRSVPResponse
    patched: IRSVPResponse
}


export async function patchRSVP(rsvp : IRSVPUpdate, id : string){

    var patches = createJsonPatch(rsvp);
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/RSVP/${id}`, {
        headers,
        method: "PATCH",
        body: JSON.stringify(patches)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);

        let data = await response.json();
        console.log(data)
        console.log("DATASearchMe")
        data = data as IPatchRSVPResponse;
     
     return data.patched; //Will return original and patched version, we want patched aka index 1
}