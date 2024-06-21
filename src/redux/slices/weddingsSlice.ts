import { PayloadAction, createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { IWeddingRequest, createWedding } from '../../API/CreateWedding'
import { fetchWeddings, fetchWeddingsWithParticipant } from '../../API/GetWeddings'
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
        replaceWedding: (state, action: PayloadAction<IWedding>) => {
            var newArray = state.weddings.findIndex((wedding) => {
                if(wedding.id == action.payload.id)
                    return true;
                else return false;
            });
            state.weddings[newArray] = action.payload;
        },
    },
    extraReducers: (builder) =>  {
        builder.addCase(getWeddingsByParticipant.fulfilled, (state, action)=>{
            console.log("WeddingsByParticipant ONLY sent        ---------------------------------------------------------------------") 

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
                return test;
            })
            console.log(weddings) 
            state.weddings = weddings;


        }),
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
                return test;
            })
            console.log("WeddingsByParticipant or All sent        ---------------------------------------------------------------------") 
            console.log(weddings) 
            


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

  export const getWeddingsByParticipant = createAsyncThunk(
    'weddings/setWeddingsByParticipant',
    //Inside thunk function
    async (participantId : string)=> {
        try {
          const weddings = await fetchWeddingsWithParticipant(participantId);
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

export const { replaceWedding } = weddingsSlice.actions



export default weddingsSlice.reducer