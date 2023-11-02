import { configureStore } from '@reduxjs/toolkit';
import confirmModalReducer from './features/modal/confirmModalSlice';
import pageReducer from './features/page/pageSlice';

export default configureStore({
    reducer: {
        confirmModal: confirmModalReducer,
        page: pageReducer,
    },
});
