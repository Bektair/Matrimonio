import { API_URL } from "../constants/environment";
import { ILocationResponse } from "./GetLocations";
import getAuthHeaders from "./SetAuthHeaders";


export interface ILocationRequest {
    title: string
    body: string
    placeName: string
    address: string
    image: string
    country: string
    region: string
    lat: number
    lng: number
}

export async function createLocation( locationRequest : ILocationRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Location`, {
        method: "POST",
        headers,
        body: JSON.stringify(locationRequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ILocationResponse;
    return data;
}