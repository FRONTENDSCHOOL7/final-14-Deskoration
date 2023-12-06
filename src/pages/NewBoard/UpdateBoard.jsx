import React, { useEffect, useState } from 'react';
import * as S from './UpdateBoard.styled';
import { updatePostApi, detialPostApi } from '../../service/post_service';
import GradientButton from '../../components/GradientButton/GradientButton';
import PostUploadForm from './PostUploadForm';
import usePageHandler from '../../hooks/usePageHandler';
import RegisterForm from './RegisterForm';
import { useLocation, useNavigate } from 'react-router-dom';

const PostUpdateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = 'https://api.mandarin.weniv.co.kr/';
    const baseUrlLength = baseURL.length;
    const pathName = location.pathname;
    const postData = location.state?.postData;
    const token = sessionStorage.getItem('Token');
    const [updateData, setUpdateData] = useState();
    const [imageURL, setImageURL] = useState('');
    const [imageFile, setImageFile] = useState(
        postData?.image.substring(baseUrlLength),
    );
    const [productItems, setProductItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [textArea, setTextArea] = useState({});

    usePageHandler('text', '게시물 수정');

    // console.log(postData.id);

    const trimTextArea = () => {
        setTextArea(prev => ({
            ...prev,
            message: prev.message.trim(),
            length: prev.message.trim().length,
        }));
    };

    useEffect(() => {
        console.log(postData);
        detialPostApi(postData?.id, token)
            .then(response => {
                const resData = JSON.parse(response.post.content);
                const contentData = resData?.deskoration || {};
                setImageURL(postData.image || '');
                setProductItems(contentData.productItems || []);
                setTextArea({
                    message: contentData.message || '',
                    length: contentData.message
                        ? contentData.message.length
                        : 0,
                });
            })
            .catch(error => {
                console.log('error', error);
            });
    }, [token]);

    const deleteProduct = itemID => {
        if (window.confirm('상품을 삭제 하겠습니까?')) {
            const updatedProductItems = productItems.filter(
                item => item.detail?.id !== itemID,
            );
            setProductItems(updatedProductItems);
        }
    };

    const handleMessageChange = e => {
        setTextArea({
            message: e.target.value,
            length: e.target.value.length,
        });
    };

    useEffect(() => {
        setUpdateData({
            message: textArea.message?.trim(),
            productItems,
        });
    }, [textArea.message, productItems]);

    const submitPost = async event => {
        event.preventDefault();

        try {
            if (!textArea.message || !imageURL) {
                alert('나의 데스크 셋업 이미지와 설명 칸을 비울 수 없습니다.');
                return;
            }

            const responseData = await updatePostApi(
                token,
                postData?.id,
                updateData,
                imageFile,
            );

            console.log('Post updated successfully:', responseData);

            navigate('/home');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <S.NewBoardContainer>
            {pathName === `/postEdit/${postData?.id}` ? (
                <form onSubmit={submitPost}>
                    <PostUploadForm
                        productItems={productItems}
                        setProductItems={setProductItems}
                        setOffset={setOffset}
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                        setImageFile={setImageFile}
                        deleteProduct={deleteProduct}
                    />
                    <S.NewBoardTextarea
                        value={textArea.message}
                        maxLength="100"
                        placeholder="나의 데스크 셋업에 대해서 얘기해주세요."
                        onChange={handleMessageChange}
                    />
                    <S.TextareaCounterP>
                        {textArea.length}/100
                    </S.TextareaCounterP>
                    <S.SubmitButtonBox>
                        <GradientButton
                            type="submit"
                            children={'수정하기'}
                            gra={'true'}
                            width={'70px'}
                            padding={'10px'}
                        />
                    </S.SubmitButtonBox>
                </form>
            ) : (
                <RegisterForm
                    productItems={productItems}
                    setProductItems={setProductItems}
                    offset={offset}
                    trimTextArea={trimTextArea}
                />
            )}
        </S.NewBoardContainer>
    );
};

export default PostUpdateForm;
