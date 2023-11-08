import { configureStore } from '@reduxjs/toolkit';
import confirmModalReducer from './features/modal/confirmModalSlice';
import alertModalReducer from './features/modal/alertModalSlice';
import pageTitleReducer from './features/pageTitle/pageTitleSlice';

export default configureStore({
    reducer: {
        confirmModal: confirmModalReducer,
        alertModal: alertModalReducer,
        pageTitle: pageTitleReducer,
    },
});
