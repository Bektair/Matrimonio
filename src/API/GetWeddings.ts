import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


interface IParams {
    weddingId: string
}

export interface IWeddingResponse {
    id: number
    description: string
    dresscode: string
}

export async function fetchWeddings() : Promise<IWeddingResponse[]> {

    console.log("TRYING TO FETCH")
    


    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Wedding`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IWeddingResponse[];
    return data;
}

export async function fetchWedding({weddingId} : IParams)  {
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Wedding?$filter=weddingId eq ${Number(weddingId)}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IWeddingResponse[];
    

    return data.length>0 ? data[0] : undefined;
    
}