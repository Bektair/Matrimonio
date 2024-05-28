import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IWeddingRequest, createWedding } from '../../API/CreateWedding'
import { fetchWeddings } from '../../API/GetWeddings'
import { IWedding } from '../../models/IWedding'
import { RootState } from '../store'


type sliceState = {
    weddings: IWedding[]
}

const initialState: sliceState = {
    weddings: []
}

var defaultPrimaryColor = "#d147ab"
var defaultSecoundaryColor = "#203ab5"

const weddingsSlice = createSlice( {
    name: "weddings",
    initialState: initialState,
    reducers:{
        addWedding: (state, action: PayloadAction<IWedding>) => {
            state.weddings.push(action.payload)
        },
    },
    extraReducers: (builder) =>  {
        builder.addCase(getAllWeddings.fulfilled, (state, action)=>{
            let weddings = action.payload.map(wedding => {
                return { 
                    id: wedding.id,
                    description: wedding.description,
                    dresscode: wedding.dresscode,
                    primaryColor: defaultPrimaryColor,
                    secoundaryColor: defaultSecoundaryColor,
                    backgroundImage: "ok"
                }
            }) 

            state.weddings = weddings;
        }),
        builder.addCase(createAWedding.fulfilled, (state, action)=>{
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

                return {
                    ...state,
                    weddings: [...state.weddings, wedding],
                }
            } else{
            }
        })
    }
})
export const { addWedding } = weddingsSlice.actions

export const getAllWeddings = createAsyncThunk(
    'weddings/setWeddings',
    //Inside thunk function
    async ()=> {
        try {
          const posts = await fetchWeddings();
          return posts;
        }catch (err){
          return [];
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
export const selectWeddings = (state: RootState) => {
    return state.weddings.weddings;
}



export default weddingsSlice.reducer