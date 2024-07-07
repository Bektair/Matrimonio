import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


export interface IRSVPCreate {
    body: string
    deadline: number
    status: string
    numberOfGuests: number
    OtherDietaryRequirements: string
    signerId: string
    weddingId: number
}


export async function createRSVP(rsvp : IRSVPCreate){
    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/RSVP`, {
        headers,
        method: "POST",
        body: JSON.stringify(rsvp)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
}

export interface IMenuOrderCreate{
    name : string
    alergens : string
    isAdult : boolean
    menuOptionId : number
}

export interface IMenuOrderCreateRSVP {
    RSVP_id : string
    MenuOrders : IMenuOrderCreate
}

export async function addMenuOrder(menuOrder: IMenuOrderCreateRSVP){

    console.log("INSIDE POST MENUORDERCREATE")
    console.log(menuOrder)
    console.log(menuOrder.MenuOrders)


    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/RSVP/${menuOrder.RSVP_id}`, {
        headers,
        method: "POST",
        body: JSON.stringify(menuOrder.MenuOrders)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
}