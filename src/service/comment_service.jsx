const baseURL = 'https://api.mandarin.weniv.co.kr/';

export const fetchcomment = async (id, token) => {
    try {
        const response = await fetch(`${baseURL}post/${id}/comments`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        console.log(result.comments);
        console.log(token);
        return result;
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

export const postComment = async (id, content, token) => {
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
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};
