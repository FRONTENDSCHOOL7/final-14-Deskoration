import instance from './axiosInstance';

export const validEmailAPI = async email => {
    const reqURL = `/user/emailvalid`;

    try {
        const response = await instance.post(reqURL, {
            user: { email: email },
        });
        return response.data;
    } catch (error) {
        throw new Error('정확하지 않은 이메일입니다.');
    }
};

export const validAccountNameAPI = async accountName => {
    const reqURL = `/user/accountnamevalid`;

    try {
        const response = await instance.post(reqURL, {
            user: { accountname: accountName },
        });
        return response.data;
    } catch (error) {
        throw new Error('사용중인 계정 아이디입니다.');
    }
};

export const authLoginAPI = async (emailValue, passwordValue) => {
    const reqURL = '/user/login';

    try {
        const response = await instance.post(reqURL, {
            user: {
                email: emailValue,
                password: passwordValue,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('지금은 로그인할 수 없습니다.');
    }
};

export const authSignUpAPI = async userData => {
    const reqURL = `/user`;

    try {
        const response = await instance.post(reqURL, userData);
        return response.data;
    } catch (error) {
        throw new Error('지금은 가입할 수 없습니다.');
    }
};
