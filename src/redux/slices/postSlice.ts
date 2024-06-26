import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchPosts } from "../../API/GetPosts"
import { IPost } from "../../models/IPost"

  
  type sliceState = {
    posts: IPost[]
  }

  const initialState: sliceState = {
    posts: []
  }
  


  const postSlice = createSlice({
    name: 'posts',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: initialState,
    // Reducer Rules:
    // They should only calculate the new state value based on the state and action arguments
    // They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
    // They must not do any asynchronous logic, calculate random values, or cause other "side effects"
    reducers: {
      // getPosts:  (state, action: PayloadAction<IPostResponse[]>) => {
      //   let posts = action.payload.map(post => {
      //     return {
      //       id: post.id,
      //       title: post.title,
      //       body: post.body,
      //       wedding_id: post.weddingId,
      //       author_id: post.authorId
      //     } 
      //   })

      //   return {
      //    ...state, posts
      //   }
      // },
    
    },
    extraReducers: (builder) => {
      builder.addCase(getAllPostsInWedding.fulfilled, (state, action)=>{
        let posts = action.payload.map((post : any) => {
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            wedding_id: post.weddingId,
            author_id: post.authorId
          } 
        })
        state.posts = posts;
      })
    }
  });
  
// Thunk creator
export const getAllPostsInWedding : any = createAsyncThunk(
  'posts/setPosts',
  //Inside thunk function
  async (wedding_id : number)=> {
      try {
        const posts = await fetchPosts({weddingId: wedding_id.toString()});
        return posts;
      }catch (err){
        return [];
      }
  }
)

  
  
// export const { getPosts } = postSlice.actions
  



export default postSlice.reducer