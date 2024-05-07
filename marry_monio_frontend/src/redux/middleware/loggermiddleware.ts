import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import { Action, Middleware, UnknownAction, isAction } from "redux";
import { RequestsEnum, RootState } from "../store";
import { getPosts } from "../slices/postSlice";
import { useAppDispatch } from "../Hooks/hooks";



export const loggerMiddleware : Middleware = storeAPI => next => (action) => {
    const dispatch = useAppDispatch()
    console.log('dispatching', action)
    
    if(isAction(action)){
        console.log("is an action")
        var unknownAction  = action as UnknownAction;
        switch(unknownAction.type){
            case("set-posts"): {
                var payloadAction = unknownAction as PayloadAction<string>
                console.log("Setting posts")
                break;
            }
            default: { 
                console.log("other / default action")
            }
        }
    }


        //storeApi.dispatch(RequestStarted(requestName));
    
    let result = next(action)
    console.log('next state', storeAPI.getState())
    


    return result
}
// const requestMiddleware: Middleware<{}, RootState> = storeApi => next => (action: PayloadAction<RequestPayload<any, any>>) => {
//     if(action.type === REQUEST_ACTION_TYPE)
//     {
//         const { requestName, params, cbDispatch, request, sideEffect} = action.payload;
//         // Set the request as in progress / is-loading
//         storeApi.dispatch(RequestStarted(requestName));
//         // Iniate the request
//         request(params)
//         .then(data => {
//             // Update the redux store with data retrived from the request
//             storeApi.dispatch(cbDispatch(data));
//             // Update the request to complete / is-not-loading
//             storeApi.dispatch(RequestFinished(requestName));
//             if(sideEffect)
//                 sideEffect();
//         })
//         .catch((error) => {
//             // Update the request to failed
//             storeApi.dispatch(RequestFailed({requestName, error}));
//         });
//     }

//     return next(action);
// }


// export default requestMiddleware;
