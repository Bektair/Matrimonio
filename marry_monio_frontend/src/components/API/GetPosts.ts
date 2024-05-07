import { PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/environment";
import { RequestsEnum } from "../../redux/store";
import postSlice from "../../redux/slices/postSlice";
//import getAuthHeaders from "./setAuthHeaders"; For authentication

interface IParams {
    weddingId: number,
}

export interface IPostResponse {
    id: number,
    title: string,
    body: string,
    authorId: number,
    weddingId: number
}



async function GetPosts({ weddingId }: IParams ) : Promise<IPostResponse[]> {
    //const headers = await getAuthHeaders(); For Authentication
    let response = await fetch(`${API_URL}/${weddingId}/posts`, {
       // headers
    });
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    let data = await response.json() as IPostResponse[];
    return data;
}

//I fetch IPostResponse[]

//I want to Send the information to the store

//ActionCreatorWithPayload<T, string>; <RequestPayload<IParams, IPostResponse[]>
// {
//     cbDispatch: postSlice,
//     request: GetPosts,
//     params: {weddingId},
//     requestName: RequestsEnum.GetPosts,
// },


//ActionCreator
function GetPostsAction(weddingId: string): PayloadAction<string> {
    
    return {
        payload: weddingId,
        type: RequestsEnum.GetPosts //Type of action
    };
};

export default GetPostsAction

