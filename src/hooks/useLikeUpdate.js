import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLikeApi, deleteLikeApi } from '../service/like_service';

export const useLikeUpdate = (queryKey, isLike) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, token }) =>
            isLike ? postLikeApi(id, token) : deleteLikeApi(id, token),
        onMutate: async ({ id }) => {
            await queryClient.cancelQueries(queryKey);
            const previousFeedData = queryClient.getQueryData(queryKey);

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
