import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPostAPI, updatePostAPI } from '../../service/post_service';
import usePageHandler from '../../hooks/usePageHandler';
import RegisterForm from './RegisterForm';
import PostUploadForm from './PostUploadForm';
import GradientButton from '../../components/GradientButton/GradientButton';
import * as S from './NewBoard.styled';

// AddPost
const NewBoard = () => {
    const baseUrlLength = process.env.REACT_APP_BASE_URL.length;

    const navigate = useNavigate();
    const location = useLocation();

    const pathName = location.pathname;
    const postData = location.state?.postData;
    const contentData = postData?.content
        ? JSON.parse(postData.content)?.deskoration
        : {};
    const postId = postData?.id;
    const isPostEdit = pathName === `/postEdit/${postId}`;
    const initialStates = isPostEdit
        ? {
              imageURL: postData?.image || '',
              imageFile: postData?.image?.substring(baseUrlLength) || '',
              productItems: contentData?.productItems || [],
              textArea: {
                  message: contentData?.message || '',
                  length: contentData?.message
                      ? contentData?.message.length
                      : 0,
              },
          }
        : {
              imageURL: '',
              imageFile: '',
              productItems: [],
              textArea: { message: '', length: 0 },
          };

    const [apiContent, setApiContent] = useState();
    const [updateData, setUpdateData] = useState();
    const [imageURL, setImageURL] = useState(initialStates.imageURL);
    const [imageFile, setImageFile] = useState(initialStates.imageFile);
    const [productItems, setProductItems] = useState(
        initialStates.productItems,
    );
    const [textArea, setTextArea] = useState(initialStates.textArea);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const queryClient = useQueryClient();

    usePageHandler(
        'text',
        pathName.includes(`/postUpload`) ? '게시글 작성' : '게시글 수정',
    );

    const trimTextArea = () => {
        setTextArea(prev => ({
            ...prev,
            message: prev.message.trim(),
            length: prev.message.trim().length,
        }));
    };

    const handleMessageChange = e => {
        setTextArea({
            message: e.target.value,
            length: e.target.value.length,
        });
    };

    const deleteProduct = itemID => {
        if (window.confirm('상품을 삭제 하겠습니까?')) {
            const updatedProductItems = productItems.filter(
                item => item.detail.id !== itemID,
            );
            setProductItems(updatedProductItems);
        }
        return;
    };

    //게시글 작성 업데이트 data
    useEffect(() => {
        setApiContent({ message: textArea.message.trim(), productItems });
    }, [textArea.message, productItems]);

    //게시글 수정 업데이트 data
    useEffect(() => {
        setUpdateData({
            message: textArea.message?.trim(),
            productItems,
        });
    }, [textArea.message, productItems]);

    //게시물 작성 muatat
    const uploadPostMutation = useMutation({
        mutationFn: ({ apiContent, imageFile }) =>
            uploadPostAPI(apiContent, imageFile),
        onSuccess: data => {
            if (data.message === '내용 또는 이미지를 입력해주세요.') {
                alert(data.message);
            } else {
                queryClient.invalidateQueries(['getAllPosts']);
                navigate('/home');
            }
        },
    });

    //게시물 수정 muatat
    const updatePostMutation = useMutation({
        mutationFn: ({ postId, updateData, imageFile }) =>
            updatePostAPI(postId, updateData, imageFile),
        onSuccess: () => {
            navigate(-1);
        },
    });

    const submitPost = event => {
        event.preventDefault();
        if (!textArea.message || !imageURL) {
            alert('나의 데스크 셋업 이미지와 설명 칸을 비울 수 없습니다.');
            return null;
        } else {
            if (pathName === '/postUpload') {
                uploadPostMutation.mutate({ apiContent, imageFile });
            } else if (pathName === `/postEdit/${postId}`) {
                updatePostMutation.mutate({
                    postId,
                    updateData,
                    imageFile,
                });
            }
        }
    };

    return (
        <S.NewBoardContainer>
            {pathName === '/postUpload' ||
            pathName === `/postEdit/${postId}` ? (
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
                            children={'올리기'}
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

export default NewBoard;
