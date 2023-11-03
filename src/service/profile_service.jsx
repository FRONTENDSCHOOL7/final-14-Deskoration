const baseURL = 'https://api.mandarin.weniv.co.kr/';
const token = sessionStorage.getItem('tempToken');
const myAccountName = sessionStorage.getItem('tempAccountName');
const userAccountName = 'hothot';

export const GetUserProfile = async () => {
    const reqURL = `${baseURL}profile/${userAccountName}`;

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

export const GetMyProfile = async () => {
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
