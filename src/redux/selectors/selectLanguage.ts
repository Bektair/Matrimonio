import { RootState } from "../store";

export const selectLanguage = (state: RootState) => {
    return state.language;
}
