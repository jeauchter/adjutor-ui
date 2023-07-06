import { configureStore } from '@reduxjs/toolkit'
import { classesAPI } from './apiSlice'
// ...

export const store = configureStore({
  reducer: {
    [classesAPI.reducerPath]: classesAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(classesAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch