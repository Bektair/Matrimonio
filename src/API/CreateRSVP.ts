import { API_URL } from "../constants/environment";
import { IMenuOrderResponse } from "./GetMenuOrders";
import getAuthHeaders from "./SetAuthHeaders";


export interface IRSVPCreate {
    body: string
    deadline: number
    status: string
    numberOfGuests: number
    OtherDietaryRequirements: string
    signerId: string
    weddingId: number
    language: string
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
    let response = await fetch(`${API_URL}/api/RSVP/${menuOrder.RSVP_id}/AddMenuOrder`, {
        headers,
        method: "POST",
        body: JSON.stringify(menuOrder.MenuOrders)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
     let data = await response.json() as IMenuOrderResponse;
     return { data: data, RSVP_id: menuOrder.RSVP_id};
}

export interface ITranslationRSVP{
    body: string
    language: string
    isDefaultLanguage: boolean
}

export interface ITranslationRSVPRequest{
    translation : ITranslationRSVP
    rsvpId: string
}

export async function addTranslationRSVP(request : ITranslationRSVPRequest){

    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/RSVP/${request.rsvpId}/Translation`, {
        headers,
        method: "POST",
        body: JSON.stringify(request.translation)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
    return;
}