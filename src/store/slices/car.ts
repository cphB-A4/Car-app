import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarType } from '../../types/collection';

export interface CarState {
    car: CarType | null;
}

const initialState: CarState = {
    car: null
};

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setCar: (state, action: PayloadAction<CarType>) => {
            state.car = action.payload;
        },
        updateNickname: (state, action: PayloadAction<string>) => {
            state.car = {
                ...state.car,
                nickname: action.payload
            };
        },
        updateFavourite: (state, action: PayloadAction<boolean>) => {
            state.car = {
                ...state.car,
                favourite: action.payload
            };
        }
    }
});

export const { setCar, updateNickname, updateFavourite } = carSlice.actions;

export default carSlice.reducer;
