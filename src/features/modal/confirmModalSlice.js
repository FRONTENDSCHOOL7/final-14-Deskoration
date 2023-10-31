const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    isOpen: false,
};

const confirmModalSlice = createSlice({
    name: 'confirmModal',
    initialState,
    reducers: {
        openConfirmModal: (state, action) => {
            state.isOpen = true;
        },
        closeConfirmModal: (state, action) => {
            state.isOpen = false;
        },
    },
});

export const { openConfirmModal, closeConfirmModal } =
    confirmModalSlice.actions;

export default confirmModalSlice.reducer;
