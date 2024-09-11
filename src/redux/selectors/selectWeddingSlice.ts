import { RootState } from "../store";

export const selectWedding = (state: RootState) => {
    return state.wedding.wedding;
}

export const selectPosts = (state: RootState) => {
    return state.wedding.posts;
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
    var index = state.wedding.rsvps.findIndex((rsvp :any)=>rsvp.signer.id == AuthId)
    if(index < 0)
        return undefined
    return state.wedding.rsvps[index];
}

export const selectRSVPMenuOrders = (state: RootState, AuthId: string | undefined) =>{
    var rsvp = selectRSVPByAuthId(state, AuthId);
    if(!rsvp?.id)
        return undefined
    var index = state.wedding.rsvps.findIndex((rsvp :any)=>rsvp.id == rsvp.id)
    return state.wedding.rsvps[index].menuOrders;

}



export const selectReception = (state: RootState) => {
    return state.wedding.reception;
}


export const selectParticipants = (state: RootState) => {
    return state.wedding.participants;
}