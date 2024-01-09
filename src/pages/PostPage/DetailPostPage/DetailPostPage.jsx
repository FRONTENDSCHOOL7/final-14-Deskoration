import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import usePageHandler from 'hooks/usePageHandler';
import {
    useCommentQueryData,
    useDetailPostQueryData,
} from 'hooks/useQueryData';

import AlertModal from 'components/common/AlertModal/AlertModal';
import DetailPost from 'components/Post/PostDetail/DetailPost/DetailPost';
import Comment from 'components/Post/PostDetail/Comment/Comment';
import Loader from 'components/common/Loading/Loader';
import NotFoundPage from 'pages/404/NotFoundPage';

const DetailPostPage = () => {
    const { id: postId } = useParams();
    const {
        data: postData,
        isLoading: postLoading,
        error: postError,
    } = useDetailPostQueryData(postId);

    const {
        data: commentData,
        isLoading: commentLoading,
        error: commentError,
    } = useCommentQueryData(postId);

    const HandlerName = postData;

    usePageHandler(
        'user',
        HandlerName?.author?.image,
        HandlerName?.author?.username,
        HandlerName?.author?.accountname,
    );

    const { register, handleSubmit, resetField, setFocus } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            comment: '',
        },
    });

    return (
        <>
            {postLoading || commentLoading ? (
                <Loader />
            ) : (
                <>
                    <DetailPost
                        commentLength={commentData.length}
                        postData={postData}
                        postId={postId}
                        setFocus={setFocus}
                    />
                    <Comment
                        commentData={commentData}
                        postId={postId}
                        register={register}
                        handleSubmit={handleSubmit}
                        resetField={resetField}
                    />
                </>
            )}
            <AlertModal />
            {(postError || commentError) && <NotFoundPage />}
        </>
    );
};

export default DetailPostPage;
