const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    isOpen: false,
};

const alertModalSlice = createSlice({
    name: 'alertModal',
    initialState,
    reducers: {
        openAlertModal: (state, action) => {
            state.isOpen = true;
        },
        closeAlertModal: (state, action) => {
            state.isOpen = false;
        },
    },
});

export const { openAlertModal, closeAlertModal } = alertModalSlice.actions;

export default alertModalSlice.reducer;
