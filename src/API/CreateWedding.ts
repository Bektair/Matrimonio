import { API_URL } from "../constants/environment";
import { IWeddingResponse } from "./GetWeddings";
import getAuthHeaders from "./SetAuthHeaders";


interface IParams {
    weddingRequest: IWeddingRequest
}

export interface IWeddingRequest {
    description: string
    dresscode: string
}

export async function createWedding({ weddingRequest } : IParams) {
    const headers = await getAuthHeaders();

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