import { RootState } from "../store";

export const selectWeddings = (state: RootState) => {
    return state.weddings.weddings;
}