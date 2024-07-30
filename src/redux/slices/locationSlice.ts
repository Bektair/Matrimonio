import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ILocation } from "../../models/ILocation"
import { ILocationResponse, fetchLocations } from "../../API/GetLocations"
import { ILocationRequest, ITranslationLocationRequest, IUpdateLocationRequest, addTranslationLocation, createLocation, updateLocation } from "../../API/CreateLocation"
type sliceState = {
    locations: ILocation[]
    active_location: number | undefined

  }

  const initialState: sliceState = {
    locations: [],
    active_location: undefined,

  }
  


  const locationSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers:{
        setCurrentLocation: (state, action: PayloadAction<number | undefined>) => {
            var payload = action.payload;
            state.active_location = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllLocations.fulfilled, (state, action)=> {
            let locations = action.payload.map((locationResponse : any)  => {
                return {
                    address: locationResponse.address,
                    body: locationResponse.body,
                    country: locationResponse.country,
                    id: locationResponse.id,
                    image: locationResponse.image,
                    title: locationResponse.title
                } as ILocation
            })
            state.locations = locations;
        }),
        builder.addCase(createLocationThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var pay = payload as ILocationResponse;

                var location = {
                    address: pay.address,
                    body: pay.body,
                    country: pay.country,
                    image: pay.image,
                    id: pay.id,
                    title: pay.title

                } as ILocation
                state.active_location=location.id;
                state.locations.push(location);
                
            }
        }),
        builder.addCase(updateLocationThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var pay = payload as ILocationResponse;

                var location = {
                    address: pay.address,
                    body: pay.body,
                    country: pay.country,
                    image: pay.image,
                    id: pay.id,
                    title: pay.title

                } as ILocation
                state.active_location=location.id;
                
                state.locations = state.locations.map((locationMap) => {
                    if(locationMap.id == location.id){
                        return location;
                    }
                    return locationMap;
                })
                
                
            }
        })

    }
  })

  export const { setCurrentLocation } = locationSlice.actions

  export const getAllLocations : any = createAsyncThunk(
    'location/getAllLocations',
    //Inside thunk function
    async (language : string)=> {
        try {
        console.log("FETCHING locations")
          const locations = await fetchLocations(language);
          return locations;
        }catch (err){
          return [];
        }
    }
  )






export const createLocationThunk = createAsyncThunk(
    'wedding/createLocation',
    async(_location : ILocationRequest)=>{
        try{
            var location = await createLocation(_location);
            return location;
        } catch(err){
            console.log(err)
            return undefined;
        }

    }
)


export const updateLocationThunk = createAsyncThunk(
    'wedding/updateLocation',
    async(_location : IUpdateLocationRequest)=>{
        try{
            var location = await updateLocation(_location);
            return location;
        } catch(err){
            console.log(err)
            return undefined;
        }

    }
)


export const addLocationTranslationThunk = createAsyncThunk(
    'location/Translation',
    //Inside thunk function
    async (req : ITranslationLocationRequest)=> {
        try {
          await addTranslationLocation(req);
        }catch (err){
            console.log(err)
          return undefined;
        }
    }
  )

export default locationSlice.reducer