import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ILocation } from "../../models/ILocation"
import { ILocationResponse, fetchLocations } from "../../API/GetLocations"
import { ILocationRequest, createLocation, updateLocation } from "../../API/CreateLocation"
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
                    lat: locationResponse.lat,
                    lng: locationResponse.lng,
                    placename: locationResponse.placename,
                    region: locationResponse.region,
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
                    placename: pay.placename,
                    country: pay.country,
                    image: pay.image,
                    id: pay.id,
                    lat: pay.lat,
                    lng: pay.lng,
                    region: pay.region,
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
                    placename: pay.placename,
                    country: pay.country,
                    image: pay.image,
                    id: pay.id,
                    lat: pay.lat,
                    lng: pay.lng,
                    region: pay.region,
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
    async ()=> {
        try {
        console.log("FETCHING locations")
          const locations = await fetchLocations();
          return locations;
        }catch (err){
          return [];
        }
    }
  )


  export interface ICreateLocation{
    location : ILocationRequest, 
}



export const createLocationThunk = createAsyncThunk(
    'wedding/createLocation',
    async(_location : ICreateLocation)=>{
        try{
            var location = await createLocation(_location.location);
            return location;
        } catch(err){
            console.log(err)
            return undefined;
        }

    }
)

export interface IUpdateLocation {
    location: ICreateLocation
    id: number
}

export const updateLocationThunk = createAsyncThunk(
    'wedding/updateLocation',
    async(_location : IUpdateLocation)=>{
        try{
            var location = await updateLocation(_location);
            return location;
        } catch(err){
            console.log(err)
            return undefined;
        }

    }
)
export default locationSlice.reducer