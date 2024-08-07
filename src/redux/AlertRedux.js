import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alertMessage: "",
    type: "success"
}

export const alertReducer = createSlice({
    name: 'alertReducer',
    initialState,
    reducers: {
        onOpenAlertAction: (state, action) => {
            state.alertMessage = action.payload.message
            state.type = action.payload.type || "success"
        },
        onCloseAlertAction: (state) => {
            state.alertMessage = ""
            state.type = 'success'
        },
    },
})

export const { onOpenAlertAction, onCloseAlertAction } = alertReducer.actions

export default alertReducer.reducer