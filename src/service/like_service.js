import baseUrl from './base_url';

export const postLikeApi = async (postID, token) => {
    const reqURL = `${baseUrl}/post/${postID}/heart`;
    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error(error);
    }
};

export const deleteLikeApi = async (postID, token) => {
    const reqURL = `${baseUrl}/post/${postID}/unheart`;
    try {
        const response = await fetch(reqURL, {
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
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error(error);
    }
};
