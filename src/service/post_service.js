import baseUrl from './base_url';

export const uploadPostApi = async (content, image, token) => {
    const reqURL = `${baseUrl}/post`;
    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                post: {
                    content: JSON.stringify({ deskoration: content }),
                    image: `${baseUrl}/${image}`,
                },
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

export const updatePostApi = async (token, postId, postData, image) => {
    const reqUrl = `${baseUrl}/post/${postId}`;

    try {
        const response = await fetch(reqUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: {
                    content: JSON.stringify({ deskoration: postData }),
                    image: `${baseUrl}/${image}`,
                },
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Failed to update post');
        }
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating post');
    }
};

export const getAllPostApi = async token => {
    const number = 1000;
    const reqURL = `${baseUrl}/post?limit=${number}`;
    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

export const getMyPostApi = async (accountname, token) => {
    const reqURL = `${baseUrl}/post/${accountname}/userpost`;
    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            return data.post;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

export const detialPostApi = async (id, token) => {
    const reqURL = `${baseUrl}/post/${id}`;
    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

export const deletePostAPI = async (postId, token) => {
    const reqURL = `${baseUrl}/post/${postId}`;
    try {
        const response = await fetch(reqURL, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error(error);
    }
};

export const reportPostAPI = async (postId, token) => {
    const reqURL = `${baseUrl}/post/${postId}/report`;
    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error(error);
    }
};

export const getFeedApi = async token => {
    const reqURL = `${baseUrl}/post/feed`;
    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};
