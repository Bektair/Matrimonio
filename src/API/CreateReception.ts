import { API_URL } from "../constants/environment"
import { IReceptionResponse } from "./GetReception"
import getAuthHeaders from "./SetAuthHeaders"

export interface IReceptionRequest {
    startDate: string
    endDate: string
    description: string
    isDefaultLanguage: boolean,
    language: string,
    locationId: number
    weddingId: number
    menuOptions: IMenuOptionCreate[]
}

export interface IMenuOptionCreate {
    DishType: string
    Tags: string
    Image: string
    IsDefaultLanguage: boolean
    Language: string
}



export async function createReception( receptionRequest : IReceptionRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Reception`, {
        method: "POST",
        headers,
        body: JSON.stringify(receptionRequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IReceptionResponse;
    return data;
}

export interface ITranslateReception{
    Language: string
    IsDefaultLanguage: boolean
    Description: string
}

export interface ITranslateReceptionRequest {
    translate : ITranslateReception,
    receptionId: string
}

export async function addReceptionTranslation(req : ITranslateReceptionRequest){
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Reception/${req.receptionId}/Translation`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.translate)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    return;
}