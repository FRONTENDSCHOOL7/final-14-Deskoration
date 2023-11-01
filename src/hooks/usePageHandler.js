// usePageHandler.js
import { useDispatch } from 'react-redux';
import { setPage } from '../features/page/pageSlice';

const usePageHandler = () => {
    const dispatch = useDispatch();

    const handlePage = (type, value) => {
        dispatch(setPage({ type, value }));
    };

    return handlePage;
};

export default usePageHandler;
