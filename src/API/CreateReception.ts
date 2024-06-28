import { API_URL } from "../constants/environment"
import { IReceptionResponse } from "./GetReception"
import getAuthHeaders from "./SetAuthHeaders"

export interface IReceptionRequest {
    startDate: string
    endDate: string
    description: string
    locationId: number
    weddingId: number
    menuOptions: IMenuOptionCreate[]
}

export interface IMenuOptionCreate {
    dishName: string
    alergens: string
    tags: string
    image: string
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