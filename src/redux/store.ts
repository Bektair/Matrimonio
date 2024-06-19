import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loggermiddleware } from './middleware/loggermiddleware'
import postSlice from './slices/postSlice'
import weddingSlice from './slices/weddingSlice'
import weddingsSlice from './slices/weddingsSlice'
import authSlice from './slices/authSlice'
import usersSlice from './slices/usersSlice'

export enum RequestsEnum {
  GetPosts="post_slice/getPosts"
}


//These keys define the final statevalue
//Splitting the state into slicereducers
const rootReducer = combineReducers({
  posts :  postSlice,
  weddings: weddingsSlice,
  wedding: weddingSlice,
  auth: authSlice,
  users: usersSlice
})

//Has autoamtic combineredusers now.
export const store = configureStore({
  reducer: rootReducer,
  middleware: 
    getDefaultMiddleware =>
      getDefaultMiddleware().concat(loggermiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch