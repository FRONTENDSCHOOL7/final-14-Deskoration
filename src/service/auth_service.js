import baseUrl from './base_url';

export const validEmailApi = async email => {
    const reqURL = `${baseUrl}/user/emailvalid`;

    const response = await fetch(reqURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email: email } }),
    });

    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.error(`Request failed with status: ${response.status}`);
        throw new Error('Email validation failed');
    }
};

export const validAccountNameApi = async accountName => {
    const reqURL = `${baseUrl}/user/accountnamevalid`;

    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: { accountname: accountName } }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Account name validation failed');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const authLoginApi = async (emailValue, passwordValue) => {
    const reqUrl = `${baseUrl}/user/login`;

    try {
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: {
                    email: emailValue,
                    password: passwordValue,
                },
            }),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Login request failed');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Login request failed');
    }
};

export const authSignUpApi = async userData => {
    const reqURL = `${baseUrl}/user`;
    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                user: userData,
            }),
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Login request failed');
        }
    } catch (error) {
        throw error;
    }
};
