import baseUrl from './base_url';

export const getUserProfileApi = async (username, token) => {
    const reqURL = `${baseUrl}/profile/${username}`;

    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Failed to fetch user profile');
        }
    } catch (error) {
        console.error(error);
    }
};

export const getMyProfileApi = async token => {
    const reqUrl = `${baseUrl}/user/myinfo`;

    try {
        const response = await fetch(reqUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Failed to fetch user profile');
        }
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching user profile');
    }
};
