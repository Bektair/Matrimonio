import { API_URL } from "../constants/environment"
import { IMenuOrder } from "../models/IMenuOrder"
import { RSVPStatus } from "../models/IRSVP"
import { IUserReadDTO } from "../models/IUser"
import getAuthHeaders from "./SetAuthHeaders"





export interface IWeddingAndSigner{
    wedding_id: string
    signerId: string
    language: string
}

export interface IRSVPResponse {
    id: number
    body: string
    deadline: string
    status: RSVPStatus
    numberOfGuests: number
    otherDietaryRequirements: string
    signer: IUserReadDTO
    menuOrders: IMenuOrder[]
}

export interface fetchRSVPWeddingWithLang{
    weddingId : string
    language: string
}


export async function fetchRSVPWedding(rsvpFetch : fetchRSVPWeddingWithLang) : Promise<IRSVPResponse[]> {
    console.log("TRYING TO FETCH RSVP")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/Wedding/${rsvpFetch.weddingId}?language=${rsvpFetch.language}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IRSVPResponse[];
    return data;
}


export async function fetchRSVP(props: IWeddingAndSigner) : Promise<IRSVPResponse[]> {
    console.log("TRYING TO FETCH RSVP")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/${props.wedding_id}/${props.signerId}?language=${props.language}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IRSVPResponse[];
    console.log("DATA from RSVP" + data)

    return data;
}