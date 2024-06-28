import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICeremonyRequest, createCeremony } from '../../API/CreateCeremony'
import { IMenuOptionRequest, createAddMenuOption } from '../../API/CreateMenuOption'
import { IReceptionRequest, createReception } from '../../API/CreateReception'
import { fetchCeremony } from '../../API/GetCeremony'
import { fetchRSVP, fetchRSVPWedding } from '../../API/GetRSVP'
import { fetchReception } from '../../API/GetReception'
import { fetchWedding } from '../../API/GetWeddings'
import { IRSVPCreate, postRSVP } from '../../API/PostRSVP'
import { ICeremonyUpdate, updateCeremonyRequest } from '../../API/UpdateCeremony'
import { IRSVPUpdate, patchRSVP } from '../../API/UpdateRSVP'
import { IWeddingUpdate, patchWedding } from '../../API/UpdateWedding'
import { IParticipant } from '../../models/IParticipant'
import { IPost } from '../../models/IPost'
import { IRSVP } from '../../models/IRSVP'
import { IReception } from '../../models/IReception'
import { IReligiousCeremony as ICeremony } from '../../models/IReligiousCeremony'
import { IWedding } from '../../models/IWedding'


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

// var defaultPrimaryColor = "#d147ab"
// var defaultSecoundaryColor = "#203ab5"



export interface IPayload {
    wedding : IWedding,
    cssFontBodyBefore?: string
    cssFontHeadingBefore?: string
}



const weddingSlice = createSlice( {
    name: "wedding",
    initialState: initialState,
    reducers:{
        setWedding:  (state, action: PayloadAction<IPayload>) => {
            var payload = action.payload.wedding;
            console.log(payload)
            let wedding : IWedding =  {
                id: payload.id,
                primaryColor: payload.primaryColor,
                secoundaryColor: payload.secoundaryColor,
                primaryFontColor: payload.primaryFontColor,
                secoundaryFontColor: payload.secoundaryFontColor,
                backgroundImage: payload.backgroundImage,
                bodyFont: payload.bodyFont,
                headingFont: payload.headingFont,   
                description: payload.description,
                dresscode: payload.dresscode,
                picture: payload.picture,
                title: payload.title
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

        },
    },
    extraReducers: (builder) =>  {
        builder.addCase(getAWedding.fulfilled, (state, action)=>{

            var payload = action.payload;
            if(payload!=undefined){
                let wedding : IWedding =  {
                    id: payload.id,
                    primaryColor: payload.primaryColor,
                    secoundaryColor: payload.secoundaryColor,
                    primaryFontColor: payload.primaryFontColor,
                    secoundaryFontColor: payload.secoundaryFontColor,
                    backgroundImage: payload.backgroundImage,
                    bodyFont: payload.bodyFont,
                    headingFont: payload.headingFont,   
                    description: payload.description,
                    dresscode: payload.dresscode,
                    picture: payload.picture,
                    title: payload.title
                } 

                state.wedding = wedding;
            } else{
                state.wedding = undefined;
            }
        }),
        builder.addCase(updateWeddingThunk.fulfilled, (state, action)=>{
            console.log("updated Wedding")
            var payload = action.payload;
            console.log(payload)
            if(payload!=undefined){

                var updatedWedding : IWedding = {
                    primaryColor: payload.primaryColor,
                    secoundaryColor: payload.secoundaryColor,
                    primaryFontColor: payload.primaryFontColor,
                    secoundaryFontColor: payload.secoundaryFontColor,
                    backgroundImage: payload.backgroundImage,
                    bodyFont: payload.bodyFont,
                    headingFont: payload.headingFont,   
                    id: payload.id.toString(),
                    description: payload.description,
                    dresscode: payload.dresscode,
                    picture: payload.picture,
                    title: payload.title
                } 
                console.log(updatedWedding)

                var indexToChange = state.wedding?.id;
                if(indexToChange == updatedWedding.id){
                    console.log("Did we find the correct wedding?")

                    state.wedding = updatedWedding;
                }

                
            }
        }),
        builder.addCase(getCeremony.fulfilled, (state, action)=>{
            var payload = action.payload;
            if(payload!=undefined){
                var startDate = Date.parse(payload.startDate)
                var endDate = Date.parse(payload.endDate)
                console.log("PayLOADDATE:"+ payload.startDate)
                console.log("DATE:"+ startDate)
                let ceremony : ICeremony =  {
                    id: payload.id,
                    startDate: startDate,
                    endDate: endDate,
                    description: payload.description,
                    location: {
                        id: payload.location.id,
                        title: payload.location.title,
                        body: payload.location.body,
                        lat: payload.location.lat,
                        lng: payload.location.lng,
                        address: payload.location.address,
                        country: payload.location.country,
                        placename: payload.location.placename,
                        region: payload.location.region,
                        image: payload.location.image
                    }
                } 
                
                state.ceremony = ceremony;
            } else{
                state.ceremony = undefined;
            }
        }),
        builder.addCase(createRSVPThunk.fulfilled, ()=>{
            console.log("Created RSVP")
        }),
        builder.addCase(updateRSVPThunk.fulfilled, (state, action)=>{
            console.log("updated RSVP")
            var payload = action.payload;
            console.log("payload: " + payload)
            if(payload!=undefined){
                console.log("smarty: ")

                var updatedRSVP : IRSVP = {
                    body: payload.body,
                    choosenDessertId: payload.choosenDessertId,
                    choosenDinnerId: payload.choosenDinnerId,
                    deadline: Date.parse(payload.deadline),
                    id: payload.id.toString(),
                    numberOfGuests: payload.numberOfGuests,
                    otherDietaryRequirements: payload.OtherDietaryRequirements,
                    signer: payload.signer,
                    status: payload.status
                } 
                var indexToChange = state.rsvps.findIndex((rsvp)=> rsvp.id == updatedRSVP.id);
                var copy = state.rsvps.slice()
                copy[indexToChange] = updatedRSVP;
                console.log(state.rsvps)
                console.log("COPY")
                console.log(copy)

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
                            otherDietaryRequirements: rsvpResponse.OtherDietaryRequirements,
                            signer: rsvpResponse.signer,
                            choosenDessertId: rsvpResponse.choosenDessertId,
                            choosenDinnerId: rsvpResponse.choosenDinnerId,

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
                            otherDietaryRequirements: rsvpResponse.OtherDietaryRequirements,
                            signer: rsvpResponse.signer,
                            choosenDessertId: rsvpResponse.choosenDessertId,
                            choosenDinnerId: rsvpResponse.choosenDinnerId,
                    }
                })
                
                state.rsvps = rsvps;
            } else{
            }
        }),
        builder.addCase(getReception.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var responseStartDate = Date.parse(payload.startDate);
                var responseEndDate = Date.parse(payload.endDate);
                var reception : IReception = {
                    startDate: responseStartDate,
                    endDate: responseEndDate,
                    description: payload.description,
                    id: payload.id,
                    location: payload.location,
                    menuOptions: payload.menuOptions
                }
                state.reception = reception;
            }else {
                state.reception = undefined
            }

        }),
        builder.addCase(createCeremonyThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var responseStartDate = Date.parse(payload.startDate);
                var responseEndDate = Date.parse(payload.endDate);
                var ceremony : ICeremony = {
                    startDate: responseStartDate,
                    endDate: responseEndDate,
                    description: payload.description,
                    location: payload.location,
                    id: payload.id
                    
                }
                state.ceremony = ceremony;
            }
        }),
        builder.addCase(createMenuOptionThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                state.reception?.menuOptions.push(payload);
            }
        })
    }
})
export const { setWedding, changeSecondaryColor } = weddingSlice.actions

export const getAWedding = createAsyncThunk(
    'wedding/getWedding',
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

export interface IUpdateWeddingThunk{
    weddingUpdate : IWeddingUpdate, 
    id : string
}

export const updateWeddingThunk = createAsyncThunk(
    'wedding/patchWedding',
    //Inside thunk function
    async (updateWeddingThunk : IUpdateWeddingThunk)=> {
        try {
          return await patchWedding(updateWeddingThunk.weddingUpdate, updateWeddingThunk.id);
        }catch (err){
          console.log(err)
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

export interface IUpdateRSVPThunk{
    RSVP: IRSVPUpdate, 
    id : string
}

export const updateRSVPThunk = createAsyncThunk(
    'wedding/patchRSVP',
    //Inside thunk function
    async (updateRSVPthunk : IUpdateRSVPThunk)=> {
        try {
          return await patchRSVP(updateRSVPthunk.RSVP, updateRSVPthunk.id);
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

export interface IUpdateCeremonyThunk{
    update : ICeremonyUpdate, 
    id : string
}

export const updateCeremony = createAsyncThunk(
    'wedding/updateCeremony',
    async(updateCeremony : IUpdateCeremonyThunk)=> {
        try {
            const ceremony = await updateCeremonyRequest(updateCeremony.update, updateCeremony.id);
            return ceremony
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)

export const createCeremonyThunk = createAsyncThunk(
    'wedding/createCeremony',
    async(createCeremonyRequest: ICeremonyRequest)=> {
        try {
            const ceremony = await createCeremony(createCeremonyRequest);
            return ceremony
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)

export const createReceptionThunk = createAsyncThunk(
    'wedding/createReception',
    async(createReceptionRequest: IReceptionRequest)=> {
        try {
            const reception = await createReception(createReceptionRequest);
            return reception
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)


export const createMenuOptionThunk = createAsyncThunk(
    'wedding/createReception',
    async(createMenuOptionRequest: IMenuOptionRequest)=> {
        try {
            const menuoption = await createAddMenuOption(createMenuOptionRequest);
            return menuoption
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)





export default weddingSlice.reducer