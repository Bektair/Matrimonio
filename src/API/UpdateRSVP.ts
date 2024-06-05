import { API_URL } from "../constants/environment"
import { IRSVP } from "../models/IRSVP"
import { IRSVPResponse } from "./GetRSVP"
import getAuthHeaders from "./SetAuthHeaders"

export interface IRSVPUpdate {
    body: string | undefined
    deadline: number | undefined
    status: string | undefined
    numberOfGuests: number | undefined
    OtherDietaryRequirements: string | undefined
    signerId: string | undefined
    weddingId: number | undefined
    ChoosenDinnerId: number | undefined
    ChoosenDessertId: number | undefined
}

export interface IJsonpatch{
    op: string,
    path: string,
    value: string
}

function createJsonPatch(rsvp: IRSVPUpdate){
    var patch : IJsonpatch[] = [];

    Object.entries(rsvp)
    .forEach(([key, value])=> console.log(`${key}: ${value}`))



    // if(rsvp.body != undefined)
    //     patch.push({
    //         op: "replace",
    //         path: "/body",
    //         value: rsvp.body
    //     })

    // var patch : IJsonpatch[] = [
    //     {
    //         op: "replace",
    //         path: "/body",
    //         value: rsvp.body
    //     },
    //     {
    //         op: "replace",
    //         path: "/deadline",
    //         value: rsvp.deadline.toString()
    //     },
    //     {
    //         op: "replace",
    //         path: "/numberOfGuests",
    //         value: rsvp.numberOfGuests.toString()
    //     },
    //     {
    //         op: "replace",
    //         path: "/deadline",
    //         value: rsvp.deadline.toString()
    //     },
    //     {
    //         op: "replace",
    //         path: "/deadline",
    //         value: rsvp.deadline.toString()
    //     },
    //     {
    //         op: "replace",
    //         path: "/deadline",
    //         value: rsvp.deadline.toString()
    //     },
    //     {
    //         op: "replace",
    //         path: "/deadline",
    //         value: rsvp.deadline.toString()
    //     }
    // ]


}




export async function patchRSVP(rsvp : IRSVPUpdate){

    var patches = createJsonPatch(rsvp);
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/RSVPP`, {
        headers,
        method: "PATCH",
        body: JSON.stringify(patches)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);

     let data = await response.json() as IRSVPResponse[];
     return data.length>0 ? data[1] : undefined; //Will return original and patched version, we want patched
}