import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import usePageHandler from 'hooks/usePageHandler';
import { usePostMutationData } from 'hooks/useQueryData';

import PostRegister from 'components/Post/PostUpload/PostRegister/PostRegister';
import ProductRegister from 'components/Post/PostUpload/ProductRegister/ProductRegister';
import GradientButton from 'components/common/GradientButton/GradientButton';

import * as S from './AddPostPage.styled';

const AddPostPage = () => {
    const baseUrlLength = process.env.REACT_APP_BASE_URL.length;

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

    usePageHandler(
        'text',
        pathName.includes(`/postUpload`) ? '게시글 작성' : '게시글 수정',
    );

    const { addPostMutation, updatePostMutation } = usePostMutationData();

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

    const submitPost = event => {
        event.preventDefault();
        if (!textArea.message || !imageURL) {
            alert('나의 데스크 셋업 이미지와 설명 칸을 비울 수 없습니다.');
            return null;
        } else {
            if (pathName === '/postUpload') {
                addPostMutation.mutate({ apiContent, imageFile });
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
        <S.AddPostContainer>
            {pathName === '/postUpload' ||
            pathName === `/postEdit/${postId}` ? (
                <form onSubmit={submitPost}>
                    <PostRegister
                        productItems={productItems}
                        setProductItems={setProductItems}
                        setOffset={setOffset}
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                        setImageFile={setImageFile}
                        deleteProduct={deleteProduct}
                    />
                    <S.AddPostTextarea
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
                <ProductRegister
                    productItems={productItems}
                    setProductItems={setProductItems}
                    offset={offset}
                    trimTextArea={trimTextArea}
                />
            )}
        </S.AddPostContainer>
    );
};

export default AddPostPage;
