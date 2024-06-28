import { PayloadAction } from "@reduxjs/toolkit";
import { Middleware, UnknownAction, isAction } from "redux";
import { IPostResponse, fetchPosts } from "../../API/GetPosts";

//BEFORE IT REACHES THE REDUCER

export const loggermiddleware : Middleware<{}, any> = storeAPI => next => async (action) => {
    console.log('dispatching', action)
    var modifiedAction = action;
    
    if(isAction(action)){
        var unknownAction  = action as UnknownAction;
        switch(unknownAction.type){

            case("post_slice/getPosts"): {
                var payloadAction = unknownAction as PayloadAction<string>
                console.log("Setting posts")
                var posts  = await fetchPosts({weddingId: payloadAction.payload});
                console.log(posts)
                modifiedAction = {
                    type: unknownAction.type,
                    payload: posts
                } as PayloadAction<IPostResponse[]>
                break;
            }
            default: { 
                console.log("other / default action" + unknownAction.type)
            }
        }
        
            
    }

        //storeApi.dispatch(RequestStarted(requestName));
    
    let result = next(modifiedAction)
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
