import instance from './axiosInstance';

export const getUserProfileAPI = async username => {
    const reqURL = `/profile/${username}`;

    try {
        const response = await instance.get(reqURL);
        return response.data;
    } catch (error) {
        throw new Error('다른 사람의 프로필을 가져올 수 없습니다.');
    }
};

export const getMyProfileAPI = async () => {
    const reqURL = `/user/myinfo`;

    try {
        const response = await instance.get(reqURL);
        return response.data;
    } catch (error) {
        throw new Error('나의 프로필을 가져올 수 없습니다.');
    }
};

export const updateProfileAPI = async userData => {
    const reqURL = `/user`;
    try {
        const response = await instance.put(reqURL, userData);
        return response.data;
    } catch (error) {
        throw new Error('나의 프로필을 업데이트할 수 없습니다.');
    }
};
