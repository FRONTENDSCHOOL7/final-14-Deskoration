import logoImg from '../../assets/images/Logo.svg';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    currentPage: {
        type: 'image',
        value: logoImg,
    },
};

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
