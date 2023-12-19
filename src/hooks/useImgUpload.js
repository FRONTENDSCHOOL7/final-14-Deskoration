import imageCompression from 'browser-image-compression';
import { uploadImgApi } from '../service/img_service';

export const useImgUpload = (
    setImageFile,
    setImageURL,
    setProductItems,
    setIsImageLoaded,
) => {
    const handleUploadImg = async event => {
        const regex = new RegExp(/(.png|.jpg|.jpeg|.gif|.tif|.heic|bmp)/);

        const file = event.target.files[0];

        if (!file) return;

        const options = {
            maxSizeMB: 5,
        };
        const fileTypeOptions = { ...options, fileType: 'image/jpeg' };

        try {
            const compressedBlob = await imageCompression(
                file,
                regex.test(file) ? options : fileTypeOptions,
            );
            const compressedFile = new File(
                [compressedBlob],
                regex.test(file)
                    ? compressedBlob.name
                    : compressedBlob.name.split('.')[0] + '.jpeg',
                {
                    type: compressedBlob.type,
                },
            );
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const imgData = new FormData();
                imgData.append('image', compressedFile);
                uploadImgApi(imgData, setImageFile);
                setImageURL(reader.result);
            };
            setProductItems([]);
            setIsImageLoaded(false);
        } catch (error) {
            console.error(error);
        }
    };

    return handleUploadImg;
};