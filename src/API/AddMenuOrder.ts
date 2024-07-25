import { API_URL } from "../constants/environment"
import { IMenuOrderResponse } from "./GetMenuOrders"
import getAuthHeaders from "./SetAuthHeaders"


export interface IMenuOrderRequest {
    menuOrder: IMenuOrderCreate
    rsvp_id: number
}

export interface IMenuOrderCreate {
    Name : string
    Alergens : string
    IsAdult : boolean
    MenuOptionId : number
}



export async function createAddMenuOrder( menuOrderRequest : IMenuOrderRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/${menuOrderRequest.rsvp_id}/AddMenuOrder`, {
        method: "POST",
        headers,
        body: JSON.stringify(menuOrderRequest.menuOrder)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IMenuOrderResponse;
    return data;
}