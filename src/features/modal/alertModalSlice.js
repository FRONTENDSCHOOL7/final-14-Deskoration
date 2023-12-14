const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    isOpen: false,
    modalContent: '',
};

const alertModalSlice = createSlice({
    name: 'alertModal',
    initialState,
    reducers: {
        openAlertModal: (state, action) => {
            state.isOpen = true;
            state.modalContent = action.payload;
        },
        closeAlertModal: state => {
            state.isOpen = false;
            state.modalContent = '';
        },
    },
});

export const { openAlertModal, closeAlertModal } = alertModalSlice.actions;

export default alertModalSlice.reducer;
