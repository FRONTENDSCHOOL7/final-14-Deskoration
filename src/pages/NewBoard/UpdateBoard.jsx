import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updatePostAPI } from '../../service/post_service';
import usePageHandler from '../../hooks/usePageHandler';
import GradientButton from '../../components/GradientButton/GradientButton';
import PostUploadForm from './PostUploadForm';
import RegisterForm from './RegisterForm';
import * as S from './UpdateBoard.styled';

const PostUpdateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const postData = location.state?.postData;
    const contentData = postData?.content
        ? JSON.parse(postData.content)?.deskoration
        : {};
    const postId = postData?.id;
    const baseUrlLength = process.env.REACT_APP_BASE_URL.length;
    const [imageFile, setImageFile] = useState(
        postData?.image?.substring(baseUrlLength) || '',
    );
    const [updateData, setUpdateData] = useState();
    const [imageURL, setImageURL] = useState(postData?.image || '');
    const [productItems, setProductItems] = useState(
        contentData?.productItems || [],
    );
    const [textArea, setTextArea] = useState({
        message: contentData?.message || '',
        length: contentData?.message ? contentData?.message.length : 0,
    });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    usePageHandler('text', '게시물 수정');

    const trimTextArea = () => {
        setTextArea(prev => ({
            ...prev,
            message: prev.message.trim(),
            length: prev.message.trim().length,
        }));
    };

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

    const postUpdateMutation = useMutation({
        mutationFn: ({ postId, updateData, imageFile }) =>
            updatePostAPI(postId, updateData, imageFile),
        onSuccess: () => {
            navigate(-1);
        },
    });

    const submitPost = async event => {
        event.preventDefault();
        try {
            if (!textArea.message || !imageURL) {
                alert('나의 데스크 셋업 이미지와 설명 칸을 비울 수 없습니다.');
                return;
            }
            postUpdateMutation.mutate({ postId, updateData, imageFile });
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <S.NewBoardContainer>
            {pathName === `/postEdit/${postId}` ? (
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
