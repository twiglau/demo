import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
    modalOpen: boolean;
}

const initialState: State ={
    modalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers:{
        openModel(state, action) {
            state.modalOpen = true
        },
        closeModel(state) {
            state.modalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectModalOpen = (state: RootState) => state.projectList.modalOpen