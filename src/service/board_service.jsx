const baseURL = 'https://api.mandarin.weniv.co.kr/';
const token = sessionStorage.getItem('tempToken');

export const fetchPosts = async () => {
    try {
        const response = await fetch(
            `${baseURL}post/653f64b4b2cb205663908be1`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
            },
        );
        const result = await response.json();
        console.log(result);
        console.log(token);
        return result;
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};

// 게시글 전체보기
export const PostAll = async () => {
    try {
        const response = await fetch(`${baseURL}post`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            // console.log('API보기1: ', data);
            return data;
        } else {
            console.error('API 요청이 실패했습니다.');
        }
    } catch (error) {
        console.error('API 요청 중 오류 발생: ', error);
    }
};
