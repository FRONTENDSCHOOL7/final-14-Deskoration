import axiosInstance from './axiosInstance';

export const uploadImgAPI = async (formData, setImageFile) => {
    const reqURL = '/image/uploadfiles';

    try {
        const response = await axiosInstance.post(reqURL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            const data = response.data;
            setImageFile(data[0].filename);
            return data;
        } else {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Image upload failed');
        }
    } catch (error) {
        throw error;
    }
};
