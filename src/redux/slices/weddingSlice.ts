import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCeremony } from '../../API/GetCeremony'
import { fetchRSVP, fetchRSVPWedding } from '../../API/GetRSVP'
import { fetchWedding } from '../../API/GetWeddings'
import { IRSVPCreate, postRSVP } from '../../API/PostRSVP'
import { IParticipant } from '../../models/IParticipant'
import { IPost } from '../../models/IPost'
import { IRSVP } from '../../models/IRSVP'
import { IReception } from '../../models/IReception'
import { IReligiousCeremony as ICeremony } from '../../models/IReligiousCeremony'
import { IWedding } from '../../models/IWedding'
import { RootState } from '../store'
import { IRSVPUpdate, patchRSVP } from '../../API/UpdateRSVP'
import { fetchReception } from '../../API/GetReception'


interface sliceState  {
    wedding: IWedding | undefined
    reception: IReception | undefined
    ceremony: ICeremony | undefined
    participants: IParticipant[]
    rsvps: IRSVP[]
    posts: IPost[]
}

const initialState: sliceState = {
    wedding: undefined,
    reception:  undefined,
    ceremony: undefined,
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
        }),
        builder.addCase(getCeremony.fulfilled, (state, action)=>{
            var payload = action.payload;
            if(payload!=undefined){
                var date = Date.parse(payload.date)
                console.log("PayLOADDATE:"+ payload.date)
                console.log("DATE:"+ date)
                let ceremony : ICeremony =  {
                    id: payload.id,
                    date: date,
                    description: payload.description,
                    location: {
                        id: payload.location.id,
                        title: payload.location.title,
                        body: payload.location.body,
                        lat: payload.location.lat,
                        lng: payload.location.lng
                    }
                } 
                
                state.ceremony = ceremony;
            } else{
                state.ceremony = undefined;
            }
        }),
        builder.addCase(createRSVPThunk.fulfilled, (state, action)=>{
            console.log("Created RSVP")
        }),
        builder.addCase(updateRSVPThunk.fulfilled, (state, action)=>{
            console.log("updated RSVP")
            var payload = action.payload;
            if(payload!=undefined){
                var updatedRSVP : IRSVP = {
                    body: payload.body,
                    ChoosenDessertId: payload.choosenDessertId,
                    ChoosenDinnerId: payload.choosenDinnerId,
                    deadline: Date.parse(payload.deadline),
                    id: payload.id.toString(),
                    numberOfGuests: payload.numberOfGuests,
                    OtherDietaryRequirements: payload.OtherDietaryRequirements,
                    Signer: payload.signer,
                    status: payload.status
                } 
                var indexToChange = state.rsvps.findIndex((rsvp)=> rsvp.id == updatedRSVP.id);
                var copy = state.rsvps.slice()
                copy[indexToChange] = updatedRSVP;
                state.rsvps = copy;
            }


        }),
        builder.addCase(getRSVPbyWeddingAndSigner.fulfilled, (state, action)=>{
            var payload = action.payload;
            if(payload!=undefined){
                console.log("PayLOAD Length rsvp:"+ payload.length)
                let rsvps = payload.map((rsvpResponse)=> {
                    var date = Date.parse(rsvpResponse.deadline)

                     return {
                            id: rsvpResponse.id.toString(),
                            body: rsvpResponse.body,
                            deadline: date,
                            status: rsvpResponse.status,
                            numberOfGuests: rsvpResponse.numberOfGuests,
                            OtherDietaryRequirements: rsvpResponse.OtherDietaryRequirements,
                            Signer: rsvpResponse.signer,
                            ChoosenDessertId: rsvpResponse.choosenDessertId,
                            ChoosenDinnerId: rsvpResponse.choosenDinnerId,
                    }
                })
                
                state.rsvps = rsvps;
            } else{
            }
        }),
        builder.addCase(getRSVPbyWedding.fulfilled, (state, action)=>{
            var payload = action.payload;
            if(payload!=undefined){
                console.log("PayLOAD Length rsvp:"+ payload.length)
                let rsvps = payload.map((rsvpResponse)=> {
                    var date = Date.parse(rsvpResponse.deadline)
                     return {
                            id: rsvpResponse.id.toString(),
                            body: rsvpResponse.body,
                            deadline: date,
                            status: rsvpResponse.status,
                            numberOfGuests: rsvpResponse.numberOfGuests,
                            OtherDietaryRequirements: rsvpResponse.OtherDietaryRequirements,
                            Signer: rsvpResponse.signer,
                            ChoosenDessertId: rsvpResponse.choosenDessertId,
                            ChoosenDinnerId: rsvpResponse.choosenDinnerId,
                    }
                })
                
                state.rsvps = rsvps;
            } else{
            }
        }),
        builder.addCase(getReception.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var responseDate = Date.parse(payload.date);
                var reception : IReception = {
                    date: responseDate,
                    description: payload.description,
                    id: payload.id,
                    location: payload.location,
                    menuOptions: payload.menuOptions
                }
                state.reception = reception;
            }else {
                state.reception = undefined
            }

        })
    }
})
export const { setWedding, changeSecondaryColor } = weddingSlice.actions

export const getAWedding = createAsyncThunk(
    'wedding/setWedding',
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

export const getCeremony = createAsyncThunk(
    'wedding/setCeremony',
    //Inside thunk function
    async (wedding_id : number)=> {
        try {
          const ceremony = await fetchCeremony({weddingId: wedding_id.toString()});
          return ceremony;
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export const getReception = createAsyncThunk(
    'wedding/setReception',
    //Inside thunk function
    async (wedding_id : number)=> {
        try {
          const reception = await fetchReception(wedding_id);
          return reception;
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export const createRSVPThunk = createAsyncThunk(
    'wedding/postRSVP',
    //Inside thunk function
    async (RSVP : IRSVPCreate)=> {
        try {
          await postRSVP(RSVP);
        }catch (err){
          console.log(err)
        }
    }
)

export const updateRSVPThunk = createAsyncThunk(
    'wedding/patchRSVP',
    //Inside thunk function
    async (RSVP : IRSVPUpdate)=> {
        try {
          return await patchRSVP(RSVP);
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export const getRSVPbyWedding = createAsyncThunk(
    'wedding/getRSVPbyWedding',
    //Inside thunk function
    async (wedding_id : number)=> {
        try {
          const rsvp = await fetchRSVPWedding(wedding_id.toString());
          return rsvp;
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export interface IWeddingAndSigner{
    wedding_id: string
    signerId: string
}

export const getRSVPbyWeddingAndSigner = createAsyncThunk(
    'wedding/getRSVPbyWeddingAndSigner',
    //Inside thunk function
    //${weddingAndSignerId.signerId}
    async (weddingAndSignerId : IWeddingAndSigner)=> {
        try {
          const rsvp = await fetchRSVP({ weddingId: weddingAndSignerId.wedding_id, signerId: weddingAndSignerId.signerId});
          return rsvp;
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export const selectWedding = (state: RootState) => {
    return state.wedding.wedding;
}


export const selectCeremony = (state: RootState) => {
    return state.wedding.ceremony;
}

export const selectRSVPS = (state: RootState) => {
    return state.wedding.rsvps;
}

export const selectReception = (state: RootState) => {
    return state.wedding.reception;
}


export default weddingSlice.reducer