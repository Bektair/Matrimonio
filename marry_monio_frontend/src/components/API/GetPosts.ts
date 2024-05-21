import { PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";
//import getAuthHeaders from "./setAuthHeaders"; For authentication

interface IParams {
    weddingId: string,
}

export interface IPostResponse {
    id: number,
    title: string,
    body: string,
    authorId: number,
    weddingId: number
}



export async function fetchPosts({ weddingId }: IParams ) : Promise<IPostResponse[]> {
    //const headers = await getAuthHeaders(); For Authentication
    console.log("wedding id passed to middleware=" + weddingId)

    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/Post?$filter=weddingId eq ${Number(weddingId)}`, {
       headers
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IPostResponse[];
    return data;
}


//ActionCreator
function GetPostsAction(weddingId: string): PayloadAction<string> {
    
    return {
        type: "post_slice/getPosts", //Type of action
        payload: weddingId,
    };
};

export default GetPostsAction

