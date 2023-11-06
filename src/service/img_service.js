const baseURL = 'https://api.mandarin.weniv.co.kr';

export const uploadImgApi = async (formData, setImageFile) => {
    try {
        const response = await fetch(`${baseURL}/image/uploadfiles`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setImageFile(data[0].filename);
            return data;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error(error);
    }
};

// 프로필관련 api
