import instance from './axiosInstance';

export const postFollowAPI = async accountName => {
    const reqURL = `/profile/${accountName}/follow`;

    try {
        const response = await instance.post(reqURL);
        return response.data;
    } catch (error) {
        throw new Error('팔로우를 할 수 없습니다.');
    }
};

export const deleteFollowAPI = async accountName => {
    const reqURL = `/profile/${accountName}/unfollow`;

    try {
        const response = await instance.delete(reqURL);
        return response.data;
    } catch (error) {
        throw new Error('팔로우를 삭제할 수 없습니다.');
    }
};

export const getFollowerAPI = async myAccountName => {
    const reqURL = `/profile/${myAccountName}/follower`;

    try {
        const response = await instance.get(reqURL);
        return response.data;
    } catch (error) {
        throw new Error('팔로워를 가져올 수 없습니다.');
    }
};

export const getFollowingAPI = async myAccountName => {
    const reqURL = `/profile/${myAccountName}/following`;

    try {
        const response = await instance.get(reqURL);
        return response.data;
    } catch (error) {
        throw new Error('팔로잉을 할 수 없습니다.');
    }
};
