import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openAlertModal } from '../features/modal/alertModalSlice';
import { authLoginAPI } from '../service/auth_service';
import axiosInstance from '../service/axiosInstance';

export const useLoginMutationData = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return useMutation(
        (emailValue, passwordValue) => authLoginAPI(emailValue, passwordValue),
        {
            onSuccess: async data => {
                if (
                    data.message === '이메일 또는 비밀번호가 일치하지 않습니다.'
                ) {
                    dispatch(
                        openAlertModal(
                            '이메일 또는 비밀번호가 일치하지 않습니다.',
                        ),
                    );
                } else {
                    sessionStorage.setItem('Token', data.user.token);

                    axiosInstance.defaults.headers = {
                        ...axiosInstance.defaults.headers,
                        Authorization: `Bearer ${data.user.token}`,
                    };
                    navigate('/home');
                }
            },
            onError() {
                dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
            },
        },
    );
};
