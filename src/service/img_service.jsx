const baseURL = 'https://api.mandarin.weniv.co.kr';

export const UploadImg = async (formData, setImageFile) => {
    try {
        const response = await fetch(`${baseURL}/image/uploadfiles`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        setImageFile(data[0].filename);
        return data;
    } catch (err) {
        console.error(err);
    }
};

// 프로필관련 api
