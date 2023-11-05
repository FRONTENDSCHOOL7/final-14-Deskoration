const baseURL = 'https://api.mandarin.weniv.co.kr/';
const myAccountName = sessionStorage.getItem('tempAccountName');

export const GetUserProfile = async (username, token) => {
    const reqURL = `${baseURL}profile/${username}`;

    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const GetMyProfile = async token => {
    const reqURL = `${baseURL}user/myinfo`;

    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};
