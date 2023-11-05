import { configureStore } from '@reduxjs/toolkit';
import confirmModalReducer from './features/modal/confirmModalSlice';
import pageTitleReducer from './features/pageTitle/pageTitleSlice';

export default configureStore({
    reducer: {
        confirmModal: confirmModalReducer,
        pageTitle: pageTitleReducer,
    },
});
