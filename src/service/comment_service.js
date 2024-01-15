import instance from './axiosInstance';

export const getCommentAPI = async id => {
    const reqURL = `/post/${id}/comments`;

    try {
        const response = await instance.get(reqURL);

        const originalComments = response.data.comments;

        const reversedComments = [...originalComments].reverse();

        return reversedComments;
    } catch (error) {
        throw new Error('댓글을 가져올 수 없습니다.');
    }
};

export const postCommentAPI = async (id, content) => {
    const reqURL = `/post/${id}/comments`;

    const commentData = {
        comment: {
            content: content,
        },
    };

    try {
        const response = await instance.post(reqURL, commentData);

        return response.data;
    } catch (error) {
        throw new Error('댓글을 게시할 수 없습니다.');
    }
};

export const reportCommentAPI = async (postID, commentID) => {
    const reqURL = `/post/${postID}/comments/${commentID}/report`;

    try {
        const response = await instance.post(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('댓글을 신고할 수 없습니다.');
    }
};

export const deleteCommentAPI = async (postID, commentID) => {
    const reqURL = `/post/${postID}/comments/${commentID}`;

    try {
        const response = await instance.delete(reqURL);

        return response.data;
    } catch (error) {
        throw new Error('댓글을 삭제할 수 없습니다.');
    }
};
