import { RootState } from "../store";

export const selectWedding = (state: RootState) => {
    return state.wedding.wedding;
}


export const selectCeremony = (state: RootState) => {
    return state.wedding.ceremony;
}

export const selectRSVPS = (state: RootState) => {
    return state.wedding.rsvps;
}

export const selectRSVPByAuthId = (state: RootState, AuthId: string | undefined) => {
    if(!AuthId)
        return undefined;
    var index = state.wedding.rsvps.findIndex((rsvp)=>rsvp.signer.id == AuthId)
    if(index < 0)
        return undefined
    return state.wedding.rsvps[index];
}

export const selectReception = (state: RootState) => {
    return state.wedding.reception;
}

export const selectCurrentLocation = (state: RootState) => {
    return state.wedding.active_location;
}