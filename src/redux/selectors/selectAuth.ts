import { RootState } from "../store";

export const selectAuth = (state: RootState) => {
    return state.auth;
}
