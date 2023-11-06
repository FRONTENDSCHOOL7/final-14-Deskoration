export const followServiceApi = async (baseUrl, token, accountName) => {
    const reqUrl = `${baseUrl}profile/${accountName}/follow`;

    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
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
            throw new Error('Follow service API request failed');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const unFollowServiceApi = async (baseURL, token, accountName) => {
    const reqURL = `${baseURL}profile/${accountName}/unfollow`;

    try {
        const response = await fetch(reqURL, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        console.log('unfollow api:', result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const followerServiceApi = async (baseUrl, token, myAccountName) => {
    const reqUrl = `${baseUrl}profile/${myAccountName}/following`;

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
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
};
