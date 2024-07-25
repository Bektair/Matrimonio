import { API_URL } from "../constants/environment";
import { useAppSelector } from "../redux/Hooks/hooks";
import { selectLanguage } from "../redux/selectors/selectLanguage";
import getAuthHeaders from "./SetAuthHeaders";


interface IParams {
    weddingId: string
}

export interface IWeddingResponse {
    id: number
    primaryColor: string,
    secoundaryColor: string
    primaryFontColor: string
    secoundaryFontColor: string
    backgroundImage: string
    bodyFont: string
    headingFont: string
    picture: string
    language: string
    isDefaultLanguage: boolean,
    title: string
    description: string
    dresscode: string
    defaultLanguage: string
}



export async function fetchWeddings(language: string) : Promise<IWeddingResponse[]> {
    console.log("TRYING TO FETCH wedddings")
    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Wedding?language=${language.toUpperCase()}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);

    let data = await response.json() as IWeddingResponse[];
    console.log(data)
    return data;
}

export async function fetchWeddingsWithParticipant(userId : string, language: string) : Promise<IWeddingResponse[]> {

    console.log("TRYING TO FETCH")
    


    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Wedding/participant/${userId}?language=${language.toUpperCase()}`, {
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

