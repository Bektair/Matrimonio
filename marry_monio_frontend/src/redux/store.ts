import { applyMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { postReducer } from './reducers/postReducer'
import {loggerMiddleware } from './middleware/loggermiddleware'
import postSlice from './slices/postSlice'

export enum RequestsEnum {
  GetPosts="post_slice"
}

const middlewareEnhancer = applyMiddleware(loggerMiddleware)

//Has autoamtic combineredusers now.
export const store = configureStore({
  reducer: {
    "post_slice" :  postSlice
  },
  // middleware: 
  //   getDefaultMiddleware =>
  //     getDefaultMiddleware().concat(loggerMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch