// usePageHandler.js
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../features/pageTitle/pageTitleSlice';
import { useEffect } from 'react';

const usePageHandler = (type, title, username, accountname) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setPageTitle({
                type: type,
                value: title,
                username: username,
                accountname: accountname,
            }),
        );
    }, [dispatch, title, username, accountname]);
};

export default usePageHandler;
