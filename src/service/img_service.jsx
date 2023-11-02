const baseURL = 'https://api.mandarin.weniv.co.kr';

export const UploadImg = async (formData, setFile) => {
    try {
        const response = await fetch(`${baseURL}/image/uploadfiles`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        setFile(data[0].filename);
        return data;
    } catch (err) {
        console.error(err);
    }
};

// 프로필관련 api
