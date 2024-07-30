import { API_URL } from "../constants/environment";
import { ILocationResponse } from "./GetLocations";
import { createJsonPatch } from "./JsonPatch";
import getAuthHeaders from "./SetAuthHeaders";


export interface ILocationRequest {
    title: string
    body: string
    address: string
    image: string
    country: string
    language: string
    isDefaultLanguage: boolean
}

export interface ICreateLocation{
    location : ILocationRequest, 
    language: string
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

export interface IUpdateLocationTranslation{
    Country : string    
    Address : string    
    Title : string  
    Body : string
    Language: string
}

export interface IUpdateLocation{
    Image: string
    Translation: IUpdateLocationTranslation
}

export interface IUpdateLocationRequest{
    location : IUpdateLocation, 
    locationId: string
}

export async function updateLocation( locationRequest : IUpdateLocationRequest) {
    console.log("LOCATION REQEUST UPDATE Init location")
    console.log(locationRequest.location)
    var patches = createJsonPatch(locationRequest.location);
    console.log("AS A PATCH")
    console.log(patches)
    const headers = await getAuthHeaders();


    let response = await fetch(`${API_URL}/api/Location/${locationRequest.locationId}?language=${locationRequest.location.Translation.Language}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(patches)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as ILocationResponse;
    return data;
}


export interface ITranslationLocationRequest{
    translation : IUpdateLocationTranslation
    locationId: string
}

export async function addTranslationLocation(request : ITranslationLocationRequest){

    const headers = await getAuthHeaders();
    let response = await fetch(`${API_URL}/api/Location/${request.locationId}/Translation`, {
        headers,
        method: "POST",
        body: JSON.stringify(request.translation)
     })
     if(!response.ok)
         throw new Error(await response.text() || response.statusText);
    return;
}