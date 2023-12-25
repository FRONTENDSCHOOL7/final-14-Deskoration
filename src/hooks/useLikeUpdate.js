import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLikeAPI, deleteLikeAPI } from '../service/like_service';

export const useLikeUpdate = (queryKey, isLike) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id }) => (isLike ? postLikeAPI(id) : deleteLikeAPI(id)),
        onMutate: async ({ id }) => {
            await queryClient.cancelQueries(queryKey);
            const previousFeedData = queryClient.getQueryData(queryKey);

            if (queryKey[0] === 'getFeedApi') {
                queryClient.setQueryData(queryKey, oldData => {
                    return {
                        ...oldData,
                        posts: oldData.posts.map(post => {
                            if (post.id === id) {
                                return {
                                    ...post,
                                    hearted: isLike,
                                    heartCount: isLike
                                        ? post.heartCount + 1
                                        : post.heartCount - 1,
                                };
                            }
                            return post;
                        }),
                    };
                });
            } else {
                queryClient.setQueryData(queryKey, oldData => {
                    return {
                        ...oldData,
                        hearted: isLike,
                        heartCount: isLike
                            ? oldData.heartCount + 1
                            : oldData.heartCount - 1,
                    };
                });
            }
            return { previousFeedData };
        },
        onError: (error, _, context) => {
            queryClient.setQueryData(queryKey, context.previousFeedData);
            console.error('다시 시도해주세요.', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
};
