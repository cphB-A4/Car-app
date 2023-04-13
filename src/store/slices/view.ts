//NOTE: For now this is only an example. We use Suspense for the loading state.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ViwState {
    loading: boolean;
    error: Error | null;
    noData: boolean;
}

const initialState: ViwState = {
    loading: false,
    error: null,
    noData: false
};

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<Error | null>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        noData: (state) => {
            // state.noData = state
        }
    }
});

// Action creators are generated for each case reducer function
export const { setLoading, setError, clearError } = viewSlice.actions;

export default viewSlice.reducer;
