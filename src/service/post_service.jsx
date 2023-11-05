const baseURL = 'https://api.mandarin.weniv.co.kr';

export const UploadPost = async (content, image, token) => {
    try {
        const response = await fetch(`${baseURL}/post`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                post: {
                    content: JSON.stringify({ deskoration: content }),
                    image: `${baseURL}/${image}`,
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

export const GetAllPost = async token => {
    const number = 200;
    try {
        const response = await fetch(`${baseURL}/post?limit=${number}`, {
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

export const GetMyPost = async (accountname, token) => {
    try {
        const response = await fetch(
            `${baseURL}/post/${accountname}/userpost`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            },
        );

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

export const fetchPosts = async (id, token) => {
    try {
        const response = await fetch(`${baseURL}/post/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        console.log(result);
        // console.log(token);
        return result;
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};
