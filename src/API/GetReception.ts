import { API_URL } from "../constants/environment";
import { ILocation } from "../models/ILocation";
import { IMenuOption } from "../models/IMenuOption";
import getAuthHeaders from "./SetAuthHeaders";


export interface IReceptionResponse{
    id: number
    startDate: string
    endDate: string
    description: string
    isDefaultLanguage: boolean,
    language: string,
    location: ILocation
    weddingId: number
    menuOptions: IMenuOption[]
}


export async function fetchReception(weddingId : number){

    var headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Reception?filter=weddingId eq ${weddingId}`, {
        headers
    })
    if(!response.ok){
        throw new Error(await response.json() || response.statusText)
    }
    console.log("ReceptionResponse")
    var data = await response.json() as IReceptionResponse[];
    console.log(data)
    return data.length>0 ? data[0] : undefined;


}