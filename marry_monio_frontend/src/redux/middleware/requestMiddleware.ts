import { ActionCreatorWithPayload, Middleware, PayloadAction, isAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RequestFailed, RequestFinished, RequestStarted } from "../slices/requstSice";

export const REQUEST_ACTION_TYPE = "request/iniateRequest";


export enum RequestsEnum {
    GetPosts,
}

export type sideEffect = (() => void) | undefined


export interface RequestPayload<P, T> {
    requestName: RequestsEnum,
    cbDispatch: ActionCreatorWithPayload<T, string>;
    params: P,
    request: ({}: P) => Promise<T>;
    sideEffect?: sideEffect;
}

const requestMiddleware: Middleware<{}, RootState> = storeApi => next => (action: unknown) => {
    
    if(isAction(action)){
        if(action.type === REQUEST_ACTION_TYPE)
        {
            var payloadAction = action as PayloadAction<RequestPayload<any, any>>

            const { requestName, params, cbDispatch, request, sideEffect} = payloadAction.payload;
            // Set the request as in progress / is-loading
            storeApi.dispatch(RequestStarted(requestName));
            // Iniate the request
            request(params)
            .then(data => {
                // Update the redux store with data retrived from the request
                storeApi.dispatch(cbDispatch(data));
                // Update the request to complete / is-not-loading
                storeApi.dispatch(RequestFinished(requestName));
                if(sideEffect)
                    sideEffect();
            })
            .catch((error) => {
                // Update the request to failed
                storeApi.dispatch(RequestFailed({requestName, error}));
            });
        }
    }

    return next(action);
}


export default requestMiddleware;




