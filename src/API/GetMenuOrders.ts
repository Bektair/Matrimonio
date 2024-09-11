import { API_URL } from "../constants/environment"
import getAuthHeaders from "./SetAuthHeaders"

export interface IMenuOrderResponse {
    id: number
    name: string
    alergens: string
    isAdult: boolean
    menuOptionId: number
}

export interface IMenuOrderResponseWithRSVPID{
    menuOrders: IMenuOrderResponse[]
    rsvp_id: number
}

export async function getMenuOrders(rsvp_id: number) : Promise<IMenuOrderResponseWithRSVPID> {

    console.log("TRYING TO FETCH wedddings")
    


    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/${rsvp_id}/MenuOrders`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);

    let data = await response.json() as IMenuOrderResponse[];
    console.log(data)
    return {menuOrders: data, rsvp_id: rsvp_id};
}