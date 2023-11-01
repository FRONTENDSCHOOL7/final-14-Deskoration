const baseURL = 'https://api.mandarin.weniv.co.kr';

export const ValidEmail = async email => {
    const reqURL = `${baseURL}/user/emailvalid`;

    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: { email: email } }),
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
    }
};

export const ValidAccountName = async accountName => {
    const reqURL = `${baseURL}/user/accountnamevalid`;

    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: { accountname: accountName } }),
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
    }
};

export const AuthLogin = async (emailValue, passwordValue) => {
    const reqURL = `${baseURL}/user/login`;

    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: {
                    email: emailValue,
                    password: passwordValue,
                },
            }),
        });
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
    }
};
