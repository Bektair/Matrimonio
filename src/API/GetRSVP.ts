import { API_URL } from "../constants/environment"
import { IMenuOrder } from "../models/IMenuOrder"
import { RSVPStatus } from "../models/IRSVP"
import { IUserReadDTO } from "../models/IUser"
import getAuthHeaders from "./SetAuthHeaders"




interface IParams {
    weddingId: string
    signerId: string
}

export interface IRSVPResponse {
    id: number
    body: string
    deadline: string
    status: RSVPStatus
    numberOfGuests: number
    OtherDietaryRequirements: string
    signer: IUserReadDTO
    menuOrders: IMenuOrder[]
}




export async function fetchRSVPWedding(weddingId : string) : Promise<IRSVPResponse[]> {
    console.log("TRYING TO FETCH RSVP")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/${weddingId}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IRSVPResponse[];
    return data;
}


export async function fetchRSVP(props: IParams) : Promise<IRSVPResponse[]> {
    console.log("TRYING TO FETCH RSVP")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/${props.weddingId}/${props.signerId}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IRSVPResponse[];
    console.log("DATA from RSVP" + data)

    return data;
}