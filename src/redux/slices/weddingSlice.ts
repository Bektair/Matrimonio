import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICeremonyRequest, ITranslateCeremonyRequest, addCeremonyTranslation, createCeremony } from '../../API/CreateCeremony'
import { IMenuOptionRequest, createAddMenuOption } from '../../API/CreateMenuOption'
import { IParticipantRequest, addParticipant } from '../../API/CreateParticipant'
import { IReceptionRequest, ITranslateReceptionRequest, addReceptionTranslation, createReception } from '../../API/CreateReception'
import { CeremonyRequest, fetchCeremony } from '../../API/GetCeremony'
import { IParticipantGetRequest, fetchParticipants } from '../../API/GetParticipant'
import { fetchRSVP, fetchRSVPWedding, fetchRSVPWeddingWithLang, IWeddingAndSigner } from '../../API/GetRSVP'
import { fetchReception, ReceptionRequest } from '../../API/GetReception'
import { fetchWedding, IWeddingRequest } from '../../API/GetWeddings'
import { IMenuOrderCreateRSVP, IRSVPCreate, ITranslationRSVPRequest, addMenuOrder, addTranslationRSVP, createRSVP } from '../../API/CreateRSVP'
import { ICeremonyUpdate, updateCeremonyRequest } from '../../API/UpdateCeremony'
import { IRSVPUpdate, patchRSVP } from '../../API/UpdateRSVP'
import { IWeddingUpdate, patchWedding } from '../../API/UpdateWedding'
import { IParticipant } from '../../models/IParticipant'
import { IPost } from '../../models/IPost'
import { IRSVP } from '../../models/IRSVP'
import { IReception } from '../../models/IReception'
import { IReligiousCeremony as ICeremony } from '../../models/IReligiousCeremony'
import { IWedding } from '../../models/IWedding'
import { getMenuOrders } from '../../API/GetMenuOrders'
import { IMenuOrder } from '../../models/IMenuOrder'
import { deleteMenuOrder } from '../../API/DeleteMenuOrder'
import { addWeddingTranslation, IAddWeddingTranslation } from '../../API/AddWeddingTranslation'
import { fetchPosts, PostRequest } from '../../API/GetPosts'
import { addPostTranslation, IPostTranslationRequest, PostUpdateRequest, updatePost } from '../../API/UpdatePost'
import { createPost, IPostCreate } from '../../API/CreatePost'


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
                title: payload.title,
                isDefaultLanguage: payload.isDefaultLanguage,
                language: payload.language,
                defaultLanguage: payload.defaultLanguage
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
        resetWedding: ()=> initialState
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
                    dresscode: payload.dresscode,
                    picture: payload.picture,
                    title: payload.title,
                    description: payload.description,
                    isDefaultLanguage: payload.isDefaultLanguage,
                    language: payload.language,
                    defaultLanguage: payload.defaultLanguage
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
                    title: payload.title,
                    isDefaultLanguage: payload.isDefaultLanguage,
                    language: payload.language,
                    defaultLanguage: payload.defaultLanguage
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
                        address: payload.location.address,
                        country: payload.location.country,
                        image: payload.location.image,
                        isDefaultLanguage: payload.location.isDefaultLanguage,
                        language: payload.location.language
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
                    deadline: Date.parse(payload.deadline),
                    id: payload.id.toString(),
                    numberOfGuests: payload.numberOfGuests,
                    otherDietaryRequirements: payload.OtherDietaryRequirements,
                    signer: payload.signer,
                    status: payload.status,
                    menuOrders: payload.menuOrders
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
                console.log(payload)                
                let rsvps = payload.map((rsvpResponse)=> {
                    var date = Date.parse(rsvpResponse.deadline)

                     return {
                            id: rsvpResponse.id.toString(),
                            body: rsvpResponse.body,
                            deadline: date,
                            status: rsvpResponse.status,
                            numberOfGuests: rsvpResponse.numberOfGuests,
                            otherDietaryRequirements: rsvpResponse.otherDietaryRequirements,
                            signer: rsvpResponse.signer,
                            menuOrders: rsvpResponse.menuOrders
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
                console.log(payload)
                let rsvps = payload.map((rsvpResponse)=> {
                    var date = Date.parse(rsvpResponse.deadline)
                     return {
                            id: rsvpResponse.id.toString(),
                            body: rsvpResponse.body,
                            deadline: date,
                            status: rsvpResponse.status,
                            numberOfGuests: rsvpResponse.numberOfGuests,
                            otherDietaryRequirements: rsvpResponse.otherDietaryRequirements,
                            signer: rsvpResponse.signer,
                            menuOrders: rsvpResponse.menuOrders
                    }
                })
                
                state.rsvps = rsvps;
            } else{
            }
        }),
        builder.addCase(getReception.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                console.log("OKAY OKAY-------------------------------------Reception")
                console.log(action.payload)
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
                console.log(reception)
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
        }),
        builder.addCase(addParticipantThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload!=undefined) {
                var participant : IParticipant = {
                    role: payload.role,
                    id: payload.userId
                } 
                state.participants.push(participant)
            }
        }),
        builder.addCase(getParticipantsThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                console.log("------------------------------------------------------------------ThunkDone")
                console.log(payload)
                let participants : IParticipant[] = payload.map((req) =>{ return {
                    role: req.role,
                    id: req.userId
                }})
                console.log(participants)
                state.participants = participants;
            }

        }),
        builder.addCase(getMenuOrdersThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var rsvp = state.rsvps.find((rsvp) => rsvp.id == payload?.rsvp_id.toString())
                if(rsvp){
                    let menuOrders = payload.menuOrders.map((menuOrder)=> {
                         return {
                            id: menuOrder.id.toString(),
                            name: menuOrder.name,
                            alergens: menuOrder.alergens,
                            isAdult: menuOrder.isAdult,
                            menuOptionId: menuOrder.MenuOptionId
                        } as IMenuOrder
                    })

                    rsvp.menuOrders = menuOrders; 
                    
                    var indexToChange = state.rsvps.findIndex((rsvp)=> rsvp.id == payload?.rsvp_id.toString());
                    var copy = state.rsvps.slice()
                    copy[indexToChange] = rsvp;
                    console.log(state.rsvps)
                    console.log("COPY")
                    console.log(copy)
    
                    state.rsvps = copy;                
                }

            }
        }),
        builder.addCase(addMenuOrderOption.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                
                var indexToChange = state.rsvps.findIndex((rsvp)=> rsvp.id == payload?.RSVP_id.toString());
                var copy = state.rsvps.slice();


                var menuOrder : IMenuOrder = {
                    alergens: payload.data.alergens,
                    id: payload.data.id.toString(),
                    isAdult: payload.data.isAdult,
                    menuOptionId: payload.data.MenuOptionId,
                    name: payload.data.name
                } 
                copy[indexToChange].menuOrders.push(menuOrder);
                state.rsvps = copy;                
            }
        }),
        builder.addCase(deleteMenuOrderThunk.fulfilled, (state, action) => {
            var payload = action.payload;
            if(payload != undefined){
                var indexToChange = state.rsvps.findIndex((rsvp)=> rsvp.id == payload?.rsvp_id.toString());
                var copy = state.rsvps.slice();
                var index = copy[indexToChange].menuOrders.findIndex((menuOrder)=> menuOrder.id == payload?.menuOrder_id.toString());
                copy[indexToChange].menuOrders.splice(index, 1);
                state.rsvps = copy;
            }
        }),
        builder.addCase(getAllPostsInWedding.fulfilled, (state, action)=>{
            let posts = action.payload.map((post : any) => {
              return {
                id: post.id,
                title: post.title,
                body: post.body,
                wedding_id: post.weddingId,
                author_id: post.authorId,
                images: post.images,
                language: post.language
              } 
            })
            state.posts = posts;
        }),
        builder.addCase(createPostInWedding.fulfilled, (state, action)=>{
            var postResponse = action.payload;
            if(postResponse && postResponse.id == state.wedding?.id){
                var post = {
                    author_id: postResponse.authorId,
                    body: postResponse.body,
                    id: postResponse.id,
                    images: postResponse.images,
                    language: postResponse.language,
                    title: postResponse.title,
                    wedding_id: postResponse.weddingId
                } as IPost

                state.posts.push(post);
            }
        }),
        builder.addCase(updatePostThunk.fulfilled, (state, action)=>{
            var postResponse = action.payload;
            console.log("POST RESPONSEEEEEEEEEE!!")
            console.log(postResponse)
        })
    }
})
export const { setWedding, changeSecondaryColor, resetWedding } = weddingSlice.actions

export const getAWedding = createAsyncThunk(
    'wedding/getWedding',
    //Inside thunk function
    async (req : IWeddingRequest)=> {
        try {
          const wedding = await fetchWedding(req);
          
          return wedding;
        }catch (err){
          return undefined;
        }
    }
)

export interface IUpdateWeddingThunk{
    weddingUpdate : IWeddingUpdate, 
    id : string,
    language: string
}

export const updateWeddingThunk = createAsyncThunk(
    'wedding/patchWedding',
    //Inside thunk function
    async (updateWeddingThunk : IUpdateWeddingThunk)=> {
        try {
          return await patchWedding(updateWeddingThunk.weddingUpdate, updateWeddingThunk.id, updateWeddingThunk.language);
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)



export const addWeddingTranslationThunk = createAsyncThunk(
    'wedding/addTranslation',
    async(translation : IAddWeddingTranslation) => {
        try{
            return await addWeddingTranslation(translation)
        }catch(error){
            console.log(error)
            return undefined;
        }
    }
)


export const getCeremony = createAsyncThunk(
    'wedding/setCeremony',
    //Inside thunk function
    async (request : CeremonyRequest)=> {
        try {
          const ceremony = await fetchCeremony(request);
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
    async (req : ReceptionRequest)=> {
        try {
          const reception = await fetchReception(req);
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
          await createRSVP(RSVP);
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
    async (rsvpFetch : fetchRSVPWeddingWithLang)=> {
        try {
          const rsvp = await fetchRSVPWedding(rsvpFetch);
          return rsvp;
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export const getRSVPbyWeddingAndSigner = createAsyncThunk(
    'wedding/getRSVPbyWeddingAndSigner',
    //Inside thunk function
    //${weddingAndSignerId.signerId}
    async (weddingAndSignerId : IWeddingAndSigner)=> {
        try {
          const rsvp = await fetchRSVP(weddingAndSignerId);
          return rsvp;
        }catch (err){
          console.log(err)
          return undefined;
        }
    }
)

export const addTranslationRSVPThunk = createAsyncThunk(
    'rsvp/addTranslation',
    async (translationCreateReq : ITranslationRSVPRequest)=>{
        try{
            await addTranslationRSVP(translationCreateReq);
        }catch(err){
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

export const addCeremonyTranslationThunk = createAsyncThunk(
    'wedding/ceremony/translation',
    async(translationRequest : ITranslateCeremonyRequest) => {
        try{
            await addCeremonyTranslation(translationRequest);
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

export const addReceptionTranslationThunk = createAsyncThunk(
    'wedding/reception/translation',
    async(translationRequest : ITranslateReceptionRequest) => {
        try{
            await addReceptionTranslation(translationRequest);
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)


export const createMenuOptionThunk = createAsyncThunk(
    'wedding/reception/addMenuOption',
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

export const addParticipantThunk = createAsyncThunk(
    'wedding/addParticipant',
    async(participantRequest: IParticipantRequest)=> {
        try {
            const participant = await addParticipant(participantRequest);
            return participant
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)

export const getParticipantsThunk = createAsyncThunk(
    'wedding/getParticipants',
    async(participantRequest: IParticipantGetRequest)=> {
        try {
            console.log("INSIDE Participantrequest")
            const participants = await fetchParticipants(participantRequest);
            return participants
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)

export const addMenuOrderOption = createAsyncThunk(
    'wedding/RSVP/addMenuOrder',
    async(menuOrderRequest: IMenuOrderCreateRSVP) => {
        try {
            console.log("INSIDE Participantrequest")
            const menuOrder = await addMenuOrder(menuOrderRequest);
            return menuOrder
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)

export const getMenuOrdersThunk = createAsyncThunk(
    'wedding/RSVP/getMenuOrders',
    async(rsvp_id : number) => {
        try {
            console.log("INSIDE Get IMenuorders")
            const menuOrder = await getMenuOrders(rsvp_id);
            return menuOrder
        } catch(err){
            console.log(err)
            return undefined
        }
    }
)

export interface IMenuOrderDelete {
    menuOrder_id : number,
    rsvp_id: number
}

export const deleteMenuOrderThunk = createAsyncThunk(
    'wedding/RSVP/deleteMenuOrder',
    async(menuorder : IMenuOrderDelete) => {
        try{
            await deleteMenuOrder(menuorder.menuOrder_id);
        } catch(err){
            console.log(err)
            return undefined
        }
        return menuorder;
    }
)

export const getAllPostsInWedding = createAsyncThunk(
    'posts/setPosts',
    //Inside thunk function
    async (req : PostRequest)=> {
        try {
          const posts = await fetchPosts(req);
          return posts;
        }catch (err){
          return [];
        }
    }
  )

  export const createPostInWedding = createAsyncThunk(
    'post/createPost',
    async(req: IPostCreate) => {
        try {
         var createdPost =  await createPost(req);
        }catch (err){
            console.log(err)
          return undefined;
        }

        return createdPost;
    }
  )

  export const updatePostThunk= createAsyncThunk(
    'post/updatePost',
    async(req: PostUpdateRequest) =>{
        try{
            var updatedPost = await updatePost(req);
        }
        catch(err){
            console.log(err)
            return undefined
        }
        return updatedPost;
    }
  )

  export const addPostTranslationThunk = createAsyncThunk(
    'posts/Translation',
    //Inside thunk function
    async (req : IPostTranslationRequest)=> {
        try {
          await addPostTranslation(req);
        }catch (err){
            console.log(err)
          return undefined;
        }
    }
  )

  

export default weddingSlice.reducer