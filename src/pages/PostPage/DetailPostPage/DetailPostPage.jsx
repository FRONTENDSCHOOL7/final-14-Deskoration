import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { detialPostApi } from '../../../service/post_service';
import { getCommentApi } from '../../../service/comment_service';

import usePageHandler from '../../../hooks/usePageHandler';
import AlertModal from '../../../components/AlertModal/AlertModal';
import DetailPost from '../../../components/PostDetail/DetailPost/DetailPost';
import Comment from '../../../components/PostDetail/Comment/Comment';
import Loader from '../../../components/Loading/Loader';
import NotFoundPage from '../../404/NotFoundPage';

const DetailPostPage = () => {
    const token = sessionStorage.getItem('Token');
    const { id } = useParams();
    const {
        data: postData,
        isLoading: postLoading,
        error: postError,
    } = useQuery({
        queryKey: ['getDetailPost', id, token],
        queryFn: () => detialPostApi(id, token),
    });

    const {
        data: commentData,
        isLoading: commentLoading,
        error: commentError,
    } = useQuery({
        queryKey: ['getAllComment', id, token],
        queryFn: () => getCommentApi(id, token),
        select: data => data.comments.reverse(),
    });

    const HandlerName = postData?.post;
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
                        commentData={commentData}
                        data={postData}
                        token={token}
                        id={id}
                        setFocus={setFocus}
                    />
                    <Comment
                        commentData={commentData}
                        postDataID={postData.post.id}
                        token={token}
                        id={id}
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
