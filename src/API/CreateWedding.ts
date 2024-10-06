import { API_URL } from "../constants/environment";
import { IWeddingResponse } from "./GetWeddings";
import getAuthHeaders from "./SetAuthHeaders";


interface IParams {
    weddingRequest: IWeddingRequest
}

export interface IWeddingRequest {
    primaryColor : string
    secoundaryColor : string
    primaryFontColor : string
    secoundaryFontColor : string
    backgroundImage : string
    bodyFont : string
    headingFont : string
    isDefaultLanguage: boolean,
    language: string
    description: string
    dresscode: string
    title : string
    picture : string
    RSVPBody : string
}

export async function createWedding({ weddingRequest } : IParams) {
    const headers = await getAuthHeaders();

    console.log("REQUESTED for WEDDING")
    console.log(weddingRequest)

    let response = await fetch(`${API_URL}/api/Wedding`, {
        method: "POST",
        headers,
        body: JSON.stringify(weddingRequest)
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IWeddingResponse;
    return data;
}