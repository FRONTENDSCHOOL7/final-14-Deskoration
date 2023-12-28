import instance from './axiosInstance';

const BASEURL = process.env.REACT_APP_BASE_URL;

export const uploadPostAPI = async (content, image) => {
    const reqURL = `/post`;

    try {
        const response = await instance.post(reqURL, {
            post: {
                content: JSON.stringify({ deskoration: content }),
                image: `${BASEURL}/${image}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('게시글을 올릴 수 없습니다.');
    }
};

export const updatePostAPI = async (postId, postData, image) => {
    const reqURL = `/post/${postId}`;

    try {
        const response = await instance.put(reqURL, {
            post: {
                content: JSON.stringify({ deskoration: postData }),
                image: `${BASEURL}/${image}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('게시글을 수정할 수 없습니다.');
    }
};

export const getAllPostAPI = async (skip = 0) => {
    const number = 200;
    const reqURL = `${BASEURL}/post?limit=${number}&skip=${skip}`;
    try {
        const response = await instance.get(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('전체 게시글을 가져올 수 없습니다.');
    }
};

export const getMyPostAPI = async accountname => {
    const reqURL = `/post/${accountname}/userpost`;

    try {
        const response = await instance.get(reqURL);

        return response.data.post;
    } catch (error) {
        throw new Error('나의 게시글을 가져올 수 없습니다.');
    }
};

export const getDetailPostAPI = async id => {
    const reqURL = `/post/${id}`;

    try {
        const response = await instance.get(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('디테일 포스트를 가져올 수 없습니다.');
    }
};

export const deletePostAPI = async postId => {
    const reqURL = `/post/${postId}`;

    try {
        const response = await instance.delete(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('게시글을 삭제할 수 없습니다.');
    }
};

export const reportPostAPI = async postId => {
    const reqURL = `/post/${postId}/report`;

    try {
        const response = await instance.post(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('게시글을 신고할 수 없습니다.');
    }
};

export const getFeedAPI = async () => {
    const reqURL = `/post/feed`;

    try {
        const response = await instance.get(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('피드 게시글을 가져올 수 없습니다.');
    }
};
