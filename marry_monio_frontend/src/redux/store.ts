import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import {loggermiddleware } from './middleware/loggermiddleware'
import postSlice from './slices/postSlice'
import weddingsSlice from './slices/weddingsSlice'
import weddingSlice from './slices/weddingSlice'

export enum RequestsEnum {
  GetPosts="post_slice/getPosts"
}


//These keys define the final statevalue
//Splitting the state into slicereducers
const rootReducer = combineReducers({
  posts :  postSlice,
  weddings: weddingsSlice,
  wedding: weddingSlice,
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