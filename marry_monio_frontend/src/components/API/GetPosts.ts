import { PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/environment";
import { RequestsEnum, RootState } from "../../redux/store";
import postSlice from "../../redux/slices/postSlice";
import { error } from "console";
import { REQUEST_ACTION_TYPE, RequestPayload, sideEffect } from "../../redux/middleware/requestMiddleware";
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



//I fetch IPostResponse[]

//I want to Send the information to the store

// export function getGameStateAction(id: number, initialeRequest: boolean, sideEffect: sideEffect): PayloadAction<RequestPayload<IParams, RootState>> {
//     return {
//         type: REQUEST_ACTION_TYPE,
//         payload: {
//             cbDispatch: setGameState,
//             params: {id},
//             request: fetchPosts,
//             requestName: initialeRequest ? RequestsEnum.GetGameStateInital : RequestsEnum.GetGameStatePeriodicaly,
//             sideEffect
//         },
//     }
// };



//ActionCreator
function GetPostsAction(weddingId: string): PayloadAction<string> {
    
    return {
        type: RequestsEnum.GetPosts, //Type of action
        payload: weddingId,
    };
};

export default GetPostsAction

