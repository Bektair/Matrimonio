import { ActionCreatorWithPayload, Middleware, PayloadAction, isAction } from "@reduxjs/toolkit";
import { Fonts } from "../../constants/allFonts";
import { RequestsEnum } from "../../constants/requestEnums";
import { WeddingCss } from "../../constants/weddingCssVariables";
import { RequestFailed, RequestFinished, RequestStarted } from "../slices/requstSice";
import { IPayload } from "../slices/weddingSlice";

export const REQUEST_ACTION_TYPE = "request/iniateRequest";




export type sideEffect = (() => void) | undefined


export interface RequestPayload<P, T> {
    requestName: RequestsEnum,
    cbDispatch: ActionCreatorWithPayload<T, string>;
    params: P,
    request: ({}: P) => Promise<T>;
    sideEffect?: sideEffect;
}

function setLanguage(fontfamily : string, value : string, cssVariable: string){
    const regex = RegExp(",*."+value, "i")
    document.documentElement.style.setProperty(cssVariable, value  + ", "  + fontfamily.replace(regex, ""));
}




const requestMiddleware: Middleware<{}, any> = storeApi => next => (action: unknown) => {

    if(isAction(action)){
        console.log("in action, with type" + action.type)
        if(action.type == "wedding/setWedding"){
            var payloadActionWedding = action as PayloadAction<IPayload>
            var wedding = payloadActionWedding.payload.wedding;

            console.log("PayloadComingIn")
            console.log(payloadActionWedding.payload)
            var currentFonts = Fonts.DEFAULT;

            if(wedding.headingFont != undefined){
                console.log("CURRENTFONTS:PRIMARY:BEFORE:" + currentFonts)
            }

            if(wedding.backgroundImage != undefined)
                document.documentElement.style.setProperty(WeddingCss.BgImagePrimary, `url(${wedding.backgroundImage})`)
            if(wedding.primaryColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.BgColorPrimary, `${wedding.primaryColor}`)
            if(wedding.secoundaryColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.BgColorSecoundary, `${wedding.secoundaryColor}`)
            if(wedding.primaryFontColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.FontColorMain, `${wedding.primaryFontColor}`)
            if(wedding.secoundaryColor != undefined)
                document.documentElement.style.setProperty(WeddingCss.FontColorSecoundary, `${wedding.secoundaryFontColor}`)
            
            
            if(wedding.bodyFont != undefined){
                console.log("CURRENTFONTS:PRIMARY:" + currentFonts)
                setLanguage(currentFonts,wedding.bodyFont, WeddingCss.FontPrimary)
            }
            if(wedding.headingFont != undefined){
                console.log("CURRENTFONTS:SECOUNDARY:" + currentFonts)
                setLanguage(currentFonts,wedding.headingFont, WeddingCss.FontSecound)
            }

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



