import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IWeddingRequest, createWedding } from '../../API/CreateWedding'
import { fetchWeddings } from '../../API/GetWeddings'
import { IWedding } from '../../models/IWedding'


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
                var test  : IWedding =  { 
                    id: wedding.id,
                    primaryColor: wedding.primaryColor,
                    secoundaryColor: wedding.secoundaryColor,
                    primaryFontColor: wedding.primaryFontColor,
                    secoundaryFontColor: wedding.secoundaryFontColor,
                    backgroundImage: wedding.backgroundImage,
                    bodyFont: wedding.bodyFont,
                    headingFont: wedding.headingFont,   
                    description: wedding.description,
                    dresscode: wedding.dresscode
                }
                console.log(test) 
                return test;
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
                    backgroundImage: "ok",
                    bodyFont: "ok",
                    headingFont: "ok",
                    primaryFontColor: "ok",
                    secoundaryFontColor: "ok"
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
          const weddings = await fetchWeddings();
          return weddings;
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




export default weddingsSlice.reducer