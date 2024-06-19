import { ActionCreatorWithPayload, Middleware, PayloadAction, isAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RequestFailed, RequestFinished, RequestStarted } from "../slices/requstSice";
import { RequestsEnum } from "../../constants/requestEnums";
import { IPayload } from "../slices/weddingSlice";
import { WeddingCss } from "../../constants/weddingCssVariables";

export const REQUEST_ACTION_TYPE = "request/iniateRequest";




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
        console.log("in action, with type" + action.type)
        if(action.type == "wedding/setWedding"){
            var payloadActionWedding = action as PayloadAction<IPayload>
            var wedding = payloadActionWedding.payload.wedding;
            if(wedding.backgroundImage != undefined)
                document.documentElement.style.setProperty(WeddingCss.BgImagePrimary, `url(${wedding.backgroundImage})`)
            if(wedding.primaryColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.BgColorPrimary, `${wedding.primaryColor}`)
            if(wedding.secoundaryColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.BgColorSecoundary, `${wedding.secoundaryColor}`)
            if(wedding.primaryFontColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.FontColorMain, `${wedding.primaryFontColor}`)
            if(wedding.secoundaryColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.FontColorSecoundary, `${wedding.secoundaryColor}`)
            if(wedding.bodyFont != undefined)
                document.documentElement.style.setProperty(WeddingCss.FontPrimary, `${wedding.bodyFont}`)
            if(wedding.headingFont != undefined)
                document.documentElement.style.setProperty(WeddingCss.FontSecound, `${wedding.headingFont}`)

        }

        if(action.type === REQUEST_ACTION_TYPE)
        {
            console.log("in request, will update GUI here")

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




