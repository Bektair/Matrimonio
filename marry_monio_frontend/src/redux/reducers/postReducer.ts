import { PayloadAction, UnknownAction, isAction } from "@reduxjs/toolkit"
import { IPost } from "../../models/IPost"

const initialState = { posts: [] }

export function postReducer(state = initialState, action : any){
    if(isAction(action))
        if(action.type === "set-posts"){
        var test = action as PayloadAction<string>
        let posts =[ { 
        id: 1,
        author_id: 1,
        body: test.payload,
        title: "asdd",
        wedding_id: 1
        }] as IPost[]
            return {...state, posts}
        }
    return state;
  }
