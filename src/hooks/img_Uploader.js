import imageCompression from 'browser-image-compression';

export async function ImgConvert(file, setPhotoURL) {
    const options = {
        maxSizeMB: 0.5,
    };
    // 시간이 오래걸릴 경우를 대비해서 로딩 페이지 연결
    try {
        const compressedFile = await imageCompression(file, options);
        const promise = imageCompression.getDataUrlFromFile(compressedFile);

        promise.then(result => {
            setPhotoURL(result);
        });
    } catch (error) {
        console.log(error);
    }
}
