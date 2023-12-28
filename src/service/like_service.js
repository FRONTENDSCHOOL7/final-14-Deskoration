import axiosInstance from './axiosInstance';

export const postLikeAPI = async postID => {
    const reqURL = `/post/${postID}/heart`;

    try {
        const response = await axiosInstance.post(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('좋아요를 할 수 없습니다.');
    }
};

export const deleteLikeAPI = async postID => {
    const reqURL = `/post/${postID}/unheart`;

    try {
        const response = await axiosInstance.delete(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('좋아요를 삭제할 수 없습니다.');
    }
};
