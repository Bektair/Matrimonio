import { API_URL } from "../constants/environment"
import { IMenuOption } from "../models/IMenuOption"
import getAuthHeaders from "./SetAuthHeaders"

export interface IMenuOptionRequest {
    menuOption: IMenuOptionCreate
    reception_id: number
}

export interface IMenuOptionCreate {
    dishType: string
    tags: string
    image: string
}



export async function createAddMenuOption( menuOptionRequest : IMenuOptionRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Reception/AddMenuOption/${menuOptionRequest.reception_id}`, {
        method: "POST",
        headers,
        body: JSON.stringify(menuOptionRequest.menuOption)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IMenuOption;
    return data;
}