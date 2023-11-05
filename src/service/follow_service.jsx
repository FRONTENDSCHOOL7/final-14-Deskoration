import React from 'react';
const baseURL = 'https://api.mandarin.weniv.co.kr/';
const token = sessionStorage.getItem('tempToken');
const myAccountName = sessionStorage.getItem('tempAccountName');

export const followService = async () => {
    const reqURL = `${baseURL}profile/${myAccountName}/following`;

    console.log(myAccountName);
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
