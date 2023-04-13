import { configureStore } from '@reduxjs/toolkit';
import viewSlice from './slices/view';
import carSlice from './slices/car';

export const store = configureStore({
    reducer: {
        viewState: viewSlice,
        carState: carSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
