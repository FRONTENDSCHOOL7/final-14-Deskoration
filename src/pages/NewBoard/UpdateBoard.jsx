import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { updatePostAPI, getDetailPostAPI } from '../../service/post_service';

import usePageHandler from '../../hooks/usePageHandler';

import GradientButton from '../../components/GradientButton/GradientButton';
import PostUploadForm from './PostUploadForm';
import RegisterForm from './RegisterForm';

// baseURL 없앨껀데.. 이거 무엇을 위하여??
import baseUrl from '../../service/base_url';

import * as S from './UpdateBoard.styled';

// editPost?? 이거 꼭 필요한 component??
const PostUpdateForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const baseUrlLength = baseUrl.length;
    const pathName = location.pathname;
    const postData = location.state?.postData;
    const postId = postData?.id;
    const postImg = postData?.image;
    const [updateData, setUpdateData] = useState();
    const [imageURL, setImageURL] = useState('');
    // 기존 이미지 변경이 없을때, 데이터를 보내줄때 앞에 기본 url이 추가가 되서 이렇게 사용했다.
    const [imageFile, setImageFile] = useState(
        postData?.image.substring(baseUrlLength),
    );
    const [productItems, setProductItems] = useState([]);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [textArea, setTextArea] = useState({});

    usePageHandler('text', '게시물 수정');

    const trimTextArea = () => {
        setTextArea(prev => ({
            ...prev,
            message: prev.message.trim(),
            length: prev.message.trim().length,
        }));
    };

    // To.Herrypi state로 변경
    const { data: postContentData } = useQuery({
        queryKey: ['detialPost'],
        queryFn: () => getDetailPostAPI(postId),
    });

    useEffect(() => {
        if (postContentData) {
            const resData = JSON.parse(postContentData.post.content);
            const contentData = resData?.deskoration || {};
            setImageURL(postImg || '');
            setProductItems(contentData.productItems || []);
            setTextArea({
                message: contentData.message || '',
                length: contentData.message ? contentData.message.length : 0,
            });
        }
    }, [postContentData, postImg]);

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
