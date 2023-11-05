import React from 'react';
// const baseURL = 'https://api.mandarin.weniv.co.kr/';
// const token = sessionStorage.getItem('tempToken');
// const myAccountName = sessionStorage.getItem('tempAccountName');
// const accountName = 'ajttkajttk';

export const followService = async (baseURL, token, accountName) => {
    const reqURL = `${baseURL}profile/${accountName}/follow`;

    // console.log(myAccountName);
    try {
        const response = await fetch(reqURL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        // console.log('follow api:', result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const followerService = async (baseURL, token, myAccountName) => {
    const reqURL = `${baseURL}profile/${myAccountName}/following`;

    // console.log(myAccountName);
    try {
        const response = await fetch(reqURL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
        });
        const result = await response.json();
        // console.log('follower api:', result);
        return result;
    } catch (error) {
        console.error(error);
    }
};
