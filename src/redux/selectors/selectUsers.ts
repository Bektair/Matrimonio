import { RootState } from "../store";

export const selectUsers = (state: RootState) => {
    return state.users.users;
}