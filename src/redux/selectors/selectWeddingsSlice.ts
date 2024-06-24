import { RootState } from "../store";

export const selectWeddings = (state: RootState) => {
    return state.weddings.weddings;
}

export const selectWeddingsByParticipant = (state: RootState, AuthId: number) => {
    
    var newArray = state.weddings.weddings.map((x)=> x);
    return newArray.filter((wedding) => wedding.id == AuthId);
}