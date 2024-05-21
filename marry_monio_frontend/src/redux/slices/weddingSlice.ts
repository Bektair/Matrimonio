import React from 'react'
import { IWedding } from '../../models/IWedding'
import { IReception } from '../../models/IReception'
import { IReligiousCeremony } from '../../models/IReligiousCeremony'
import { IParticipant } from '../../models/IParticipant'
import { IRSVP } from '../../models/IRSVP'
import { IPost } from '../../models/IPost'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IWeddingResponse, fetchWedding } from '../../components/API/GetWeddings'
import { RootState } from '../store'
import { IWeddingRequest, createWedding } from '../../components/API/CreateWedding'
import { useAppDispatch } from '../Hooks/hooks'
import { addWedding } from './weddingsSlice'


interface sliceState  {
    wedding: IWedding | undefined
    reception: IReception | undefined
    religiousceremony: IReligiousCeremony | undefined
    participants: IParticipant[]
    rsvps: IRSVP[]
    posts: IPost[]
}

const initialState: sliceState = {
    wedding: undefined,
    reception:  undefined,
    religiousceremony: undefined,
    participants: [],
    rsvps: [],
    posts: [],
}



const weddingSlice = createSlice( {
    name: "wedding",
    initialState: initialState,
    reducers:{
        setWedding:  (state, action: PayloadAction<IWedding>) => {
            let wedding : IWedding =  {
                id: action.payload.id,
                description: action.payload.description,
                dresscode: action.payload.dresscode
            } 

            return {
            ...state, wedding
            }
        },
    },
    extraReducers: (builder) =>  {
        builder.addCase(getAWedding.fulfilled, (state, action)=>{

            var payload = action.payload;
            if(payload!=undefined){
                let wedding : IWedding =  {
                    id: payload.id,
                    description: payload.description,
                    dresscode: payload.dresscode
                } 

                state.wedding = wedding;
            } else{
                state.wedding = undefined;
            }
        }),
        builder.addCase(createAWedding.fulfilled, (state, action)=>{

            var payload = action.payload;
            if(payload!=undefined){
                let wedding : IWedding =  {
                    id: payload.id,
                    description: payload.description,
                    dresscode: payload.dresscode
                } 

                state.wedding = wedding;
            } else{
                state.wedding = undefined;
            }
        })
    }
})
export const { setWedding } = weddingSlice.actions

export const getAWedding = createAsyncThunk(
    'weddings/setWedding',
    //Inside thunk function
    async (wedding_id : number)=> {
        try {
          const wedding = await fetchWedding({weddingId: wedding_id.toString()});
          return wedding;
        }catch (err){
          return undefined;
        }
    }
)

export const createAWedding = createAsyncThunk(
    'weddings/createWedding',
    //Inside thunk function
    async (weddingRequest : IWeddingRequest)=> {
        try {
          const wedding = await createWedding({weddingRequest});
          return wedding;
        }catch (err){
          return undefined;
        }
    }
)


export const selectWedding = (state: RootState) => {
    return state.wedding.wedding;
}

export default weddingSlice.reducer