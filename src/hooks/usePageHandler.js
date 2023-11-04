// usePageHandler.js
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../features/pageTitle/pageTitleSlice';
import { useEffect } from 'react';

const usePageHandler = (type, title, username) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setPageTitle({ type: type, value: title, username: username }),
        );
    }, [dispatch, title, username]);
};

export default usePageHandler;
