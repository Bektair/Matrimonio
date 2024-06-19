import { API_URL } from "../constants/environment"
import { RSVPStatus } from "../models/IRSVP"
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
    choosenDinnerId: number | null
    choosenDessertId: number | null
    
}



export interface IUserReadDTO {
    id: string
    firstName: string
    lastName: string
    profilePicture:string
    email: string
    nickname: string
    password:string
    email_Verified:boolean
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