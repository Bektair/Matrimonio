import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


export interface ILocationResponse {
    id: number
    title: string
    body: string
    lat: number
    lng: number
    region: string
    address: string
    placename: string
    image: string
    country: string
}

export async function fetchLocations() : Promise<ILocationResponse[]> {

    console.log("TRYING TO FETCH wedddings")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Location`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);

    let data = await response.json() as ILocationResponse[];
    console.log(data)
    return data;
}