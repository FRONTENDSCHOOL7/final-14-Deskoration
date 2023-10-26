import { configureStore } from '@reduxjs/toolkit';
import confirmModalReducer from './features/modal/confirmModalSlice';

export default configureStore({
    reducer: {
        confirmModal: confirmModalReducer,
    },
});
