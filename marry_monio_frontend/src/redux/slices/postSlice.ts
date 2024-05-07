import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPost } from "../../models/IPost"
import { IPostResponse } from "../../components/API/GetPosts"
import type { RootState } from '../store'
import posts from "../../pages/Posts/posts"

  
  type sliceState = {
    posts: IPost[]
  }

  const initialState: sliceState = {
    posts: []
  }
  
  const postSlice = createSlice({
    name: 'post_slice',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: initialState,
    reducers: {
      //All the different types of api requests we can have in this case
      //I payload action Ipostresponse
      //PayloadAction = Object + string
      getPosts: (state, action: PayloadAction<string>) => {
        let posts =[ { 
          id: 1,
          author_id: 1,
          body: action.payload,
          title: "asdd",
          wedding_id: 1
        }] as IPost[]
        return {
         ...state, posts
        }
      }
    },
  });
  

//   let posts = action.payload
//   .map<IPost>(postResponse => {
//       return {
//           id: postResponse.id,
//           author_id: postResponse.authorId,
//           body: postResponse.body,
//           title: postResponse.title,
//           wedding_id: postResponse.weddingId
//       };
//   });
// return {
//   ...state,
//    posts
// }

  
  
  export const { getPosts } = postSlice.actions
  
  // Other code such as selectors can use the imported `RootState` type
  //export const selectCount = (state: RootState) => state.counter.value
  // Other code such as selectors can use the imported `RootState` type
// Other code such as selectors can use the imported `RootState` type
export const selectPosts = (state: RootState) => {
  return state.post_slice.posts;
}
  export default postSlice.reducer