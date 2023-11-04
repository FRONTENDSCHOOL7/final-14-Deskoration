import logoImg from '../../assets/images/Logo.svg';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    currentPage: {
        type: 'image',
        value: logoImg,
        username: '',
    },
};

export const pageTitleSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPageTitle: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setPageTitle } = pageTitleSlice.actions;
export default pageTitleSlice.reducer;
