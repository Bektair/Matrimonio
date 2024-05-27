import { IWedding } from '../../models/IWedding'
import { IReception } from '../../models/IReception'
import { IReligiousCeremony } from '../../models/IReligiousCeremony'
import { IParticipant } from '../../models/IParticipant'
import { IRSVP } from '../../models/IRSVP'
import { IPost } from '../../models/IPost'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWedding } from '../../API/GetWeddings'
import { RootState } from '../store'


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

var defaultPrimaryColor = "#d147ab"
var defaultSecoundaryColor = "#203ab5"


const weddingSlice = createSlice( {
    name: "wedding",
    initialState: initialState,
    reducers:{
        setWedding:  (state, action: PayloadAction<IWedding>) => {
            let wedding : IWedding =  {
                id: action.payload.id,
                description: action.payload.description,
                dresscode: action.payload.dresscode,
                primaryColor: defaultPrimaryColor,
                secoundaryColor: defaultSecoundaryColor,
                backgroundImage: "ok"
            } 

            return {
            ...state, wedding
            }
        },
        changeSecondaryColor: (state, action: PayloadAction<string>) => {
            var updatedWedding = state.wedding;
            if(updatedWedding!=undefined){
                updatedWedding.secoundaryColor=action.payload;
            }

            state.wedding=updatedWedding;

        }
    },
    extraReducers: (builder) =>  {
        builder.addCase(getAWedding.fulfilled, (state, action)=>{

            var payload = action.payload;
            if(payload!=undefined){
                let wedding : IWedding =  {
                    id: payload.id,
                    description: payload.description,
                    dresscode: payload.dresscode,
                    primaryColor: defaultPrimaryColor,
                    secoundaryColor: defaultSecoundaryColor,
                    backgroundImage: "ok"
                } 

                state.wedding = wedding;
            } else{
                state.wedding = undefined;
            }
        })
    }
})
export const { setWedding, changeSecondaryColor } = weddingSlice.actions

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




export const selectWedding = (state: RootState) => {
    return state.wedding.wedding;
}

export default weddingSlice.reducer