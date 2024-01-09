import React from 'react';
import SocialButton from './SocialButton/SocialButton';
import { useLikeUpdate } from '../../hooks/useLikeUpdate';

const Like = ({ queryKey, isLike, likeCount, mutationParams }) => {
    const likeMutation = useLikeUpdate(queryKey, true);
    const cancelLikeMutation = useLikeUpdate(queryKey, false);

    return (
        <SocialButton
            type={'like'}
            onClick={() =>
                !isLike
                    ? likeMutation.mutate(mutationParams)
                    : cancelLikeMutation.mutate(mutationParams)
            }
            isLike={isLike}
            likeCount={likeCount}
        />
    );
};

export default Like;
