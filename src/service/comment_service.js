const baseURL = 'https://api.mandarin.weniv.co.kr/';

export const getCommentApi = async (id, token) => {
    try {
        const response = await fetch(`${baseURL}post/${id}/comments`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error('API 요청 중 오류 발생: ', response.statusText);
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

export const postCommentApi = async (id, content, token) => {
    const apiUrl = `${baseURL}post/${id}/comments`;

    const commentData = {
        comment: {
            content: content,
        },
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(commentData),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            alert('댓글을 입력해 주세요.');
        }
    } catch (error) {
        console.error(error);
    }
};

export const deleteCommentApi = async (postID, commentID, token) => {
    const apiUrl = `${baseURL}post/${postID}/comments/${commentID}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error('API request failed');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
