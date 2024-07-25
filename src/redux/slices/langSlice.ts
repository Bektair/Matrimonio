import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type sliceState = {
    language : string
}

const initialState: sliceState = {
    language: "EN"
}

export const langSlice = createSlice({
    name: 'lang',
    initialState: initialState,
    reducers: {
        setLangState: (state, action: PayloadAction<sliceState>) => {
            state.language = action.payload.language;
        }
    }
})

export const { setLangState } = langSlice.actions


export default langSlice.reducer