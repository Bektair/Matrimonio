import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import { postReducer } from './reducers/postReducer'
import {loggermiddleware } from './middleware/loggermiddleware'
import postSlice from './slices/postSlice'

export enum RequestsEnum {
  GetPosts="post_slice/getPosts"
}

const middlewareEnhancer = applyMiddleware(loggermiddleware)

//These keys define the final statevalue
//Splitting the state into slicereducers
const rootReducer = combineReducers({
  posts :  postSlice
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