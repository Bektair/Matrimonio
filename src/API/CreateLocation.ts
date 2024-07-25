import { API_URL } from "../constants/environment";
import { IUpdateLocation } from "../redux/slices/locationSlice";
import { ILocationResponse } from "./GetLocations";
import { createJsonPatch } from "./JsonPatch";
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
    language: string
    isDefaultLanguage: boolean
}

export async function createLocation( locationRequest : ILocationRequest) {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Location?language=${locationRequest.language}`, {
        method: "POST",
        headers,
        body: JSON.stringify(locationRequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ILocationResponse;
    return data;
}



export async function updateLocation( locationRequest : IUpdateLocation) {
    console.log("LOCATION REQEUST UPDATE Init location")
    console.log(locationRequest.location)
    var patches = createJsonPatch(locationRequest.location.location);
    console.log("AS A PATCH")
    console.log(patches)
    const headers = await getAuthHeaders();


    let response = await fetch(`${API_URL}/api/Location/${locationRequest.id}?language=${locationRequest.location.language}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(patches)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ILocationResponse;
    return data;
}