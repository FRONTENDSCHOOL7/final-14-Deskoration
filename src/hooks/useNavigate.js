import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = path => {
        navigate(path);
    };

    return handleNavigate;
};
