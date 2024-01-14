import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openAlertModal } from 'features/modal/alertModalSlice';
import axiosInstance from 'service/axiosInstance';

import {
    authLoginAPI,
    authSignUpAPI,
    validEmailAPI,
} from 'service/auth_service';
import {
    getMyProfileAPI,
    getUserProfileAPI,
    updateProfileAPI,
} from 'service/profile_service';
import {
    getAllPostAPI,
    getDetailPostAPI,
    getFeedAPI,
    getUserPostAPI,
    reportPostAPI,
    updatePostAPI,
    uploadPostAPI,
} from 'service/post_service';
import {
    deleteFollowAPI,
    getFollowerAPI,
    getFollowingAPI,
    postFollowAPI,
} from 'service/follow_service';
import {
    getCommentAPI,
    postCommentAPI,
    reportCommentAPI,
    deleteCommentAPI,
} from 'service/comment_service';

// AUTH
// 로그인
export const useLoginMutationData = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logInMutation = useMutation({
        mutationFn: ({ emailValue, passwordValue }) =>
            authLoginAPI(emailValue, passwordValue),
        onSuccess: async data => {
            if (data.message === '이메일 또는 비밀번호가 일치하지 않습니다.') {
                dispatch(
                    openAlertModal('이메일 또는 비밀번호가 일치하지 않습니다.'),
                );
            } else {
                sessionStorage.setItem('Token', data.user.token);

                axiosInstance.defaults.headers = {
                    ...axiosInstance.defaults.headers,
                    Authorization: `Bearer ${data.user.token}`,
                };
                navigate('/home');
            }
        },
        onError: () => {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    return logInMutation;
};

// 회원가입 이메일 검사
export const useEmailValidMutationData = (email, password, setError) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailValidMutation = useMutation({
        mutationFn: emailValue => validEmailAPI(emailValue),
        onSuccess: async data => {
            if (data.message === '사용 가능한 이메일 입니다.') {
                navigate('/profileUpload', {
                    state: {
                        emailValue: email,
                        passwordValue: password,
                    },
                });
            } else if (data.message === '이미 가입된 이메일 주소 입니다.') {
                setError('email', {
                    type: 'email',
                    message: '이미 가입된 이메일 주소 입니다.',
                });
            }
        },
        onError: () => {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    return emailValidMutation;
};

// 회원가입
export const useSignupMutationData = (emailValue, passwordValue) => {
    const dispatch = useDispatch();
    const logInMutation = useLoginMutationData();

    const signUpMutation = useMutation({
        mutationFn: userData => authSignUpAPI(userData),
        onSuccess: data => {
            if (data.message === '회원가입 성공') {
                logInMutation.mutate({ emailValue, passwordValue });
            } else if (data.message === '잘못된 접근입니다.') {
                dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
            }
        },
        onError() {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    return signUpMutation;
};

// POST
// 홈페이지 데이터
export const useInfiniteAllPostsData = category => {
    const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ['getAllPosts'],
        queryFn: ({ pageParam = 0 }) => getAllPostAPI(pageParam),
        select: data => {
            const allPosts = data.pages.flatMap(page => page.posts);
            return category === 'All'
                ? allPosts.filter(post =>
                      post.content?.includes('"deskoration"'),
                  )
                : allPosts
                      .filter(post => post.content?.includes('"deskoration"'))
                      .filter(article => {
                          const content = JSON.parse(article.content);
                          return content.deskoration.productItems.some(
                              item => item.detail.category === category,
                          );
                      });
        },
        getNextPageParam: (lastPage, allPages) => {
            const morePagesExist = lastPage?.posts?.length === 200;
            return morePagesExist ? allPages.length * 200 : false;
        },
    });

    return { data, fetchNextPage, isLoading, isError };
};

// 디테일 포스트 데이터
export const useDetailPostQueryData = postId => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['getDetailPost', postId],
        queryFn: () => getDetailPostAPI(postId),
        select: data => data.post,
    });
    return { data, isLoading, error };
};

// 피드 데이터
export const useFeedQueryData = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['getFeed'],
        queryFn: () => getFeedAPI(),
        select: responseData =>
            responseData.posts.map(post => {
                const content = JSON.parse(post.content);
                const createdAt = {
                    year: new Date(post.createdAt).getFullYear(),
                    month: new Date(post.createdAt).getMonth() + 1,
                    date: new Date(post.createdAt).getDate(),
                };
                return { ...post, content: content, createdAt: createdAt };
            }),
    });
    return { data, isLoading, error };
};

// 유저 게시글
export const useUserPostQueryData = profileData => {
    const { data, isFetching, error } = useQuery({
        queryKey: ['getMyPost'],
        queryFn: () => getUserPostAPI(profileData.accountname),
        select: data =>
            data.filter(item => item.content.includes('"deskoration"')),
        enabled: !!profileData,
    });
    return { data, isFetching, error };
};

// 게시글 수정,삭제,추가
export const usePostMutationData = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addPostMutation = useMutation({
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

    const updatePostMutation = useMutation({
        mutationFn: ({ postId, updateData, imageFile }) =>
            updatePostAPI(postId, updateData, imageFile),
        onSuccess: () => {
            navigate(-1);
        },
    });

    const reportPostMutation = useMutation({
        mutationFn: ({ postId }) => reportPostAPI(postId),
        onSuccess: data => {
            if (data.message === '존재하지 않는 게시글입니다.') {
                dispatch(openAlertModal('게시글을 찾을 수 없습니다.'));
            } else {
                dispatch(openAlertModal('신고가 완료되었습니다.'));
            }
        },
    });
    return { addPostMutation, updatePostMutation, reportPostMutation };
};

// FOLLOW
export const useFollowQueryData = (isOtherUser, accountNameToUse) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [
            isOtherUser ? 'userFollowerData' : 'followerData',
            accountNameToUse,
        ],
        queryFn: () => getFollowerAPI(accountNameToUse),
        enabled: accountNameToUse !== undefined,
    });

    return { data, isLoading, isError };
};

// FOLLOWING
export const useFollowingQueryData = (isOtherUser, accountNameToUse) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [
            isOtherUser ? 'userFollowingData' : 'followingData',
            accountNameToUse,
        ],
        queryFn: () => getFollowingAPI(accountNameToUse),
        enabled: accountNameToUse !== undefined,
    });

    return { data, isLoading, isError };
};

// 팔로우 언팔로우
export const useFollowMutationData = (isOtherUser, accountNameToUse) => {
    const queryClient = useQueryClient();

    const followMutation = useMutation({
        mutationFn: accountName => postFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries([
                isOtherUser ? 'userFollowerData' : 'followerData',
                accountNameToUse,
            ]);
        },
    });

    const unfollowMutation = useMutation({
        mutationFn: accountName => deleteFollowAPI(accountName),
        onSuccess: () => {
            queryClient.invalidateQueries([
                isOtherUser ? 'userFollowerData' : 'followerData',
                accountNameToUse,
            ]);
        },
    });

    return { followMutation, unfollowMutation };
};

// PROFILE
// profile (mine or user) 에서 사용
export const useProfileQueryData = (isMyProfile, username) => {
    const queryKey = isMyProfile
        ? ['getMyProfile']
        : ['getUserProfile', username];

    return useQuery({
        queryKey,
        queryFn: () => {
            if (isMyProfile) {
                return getMyProfileAPI();
            } else {
                return getUserProfileAPI(username);
            }
        },
        select: data => {
            if (isMyProfile) {
                return data.user;
            } else {
                return data.profile;
            }
        },
        staleTime: 1000 * 60 * 5,
        cachedTime: 1000 * 60 * 6,
        enabled: isMyProfile || !!username,
    });
};

// profile update
export const useProfileMutationData = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileMutation = useMutation({
        mutationFn: async ({ userData }) => {
            const updatedData = await updateProfileAPI(userData);
            queryClient.setQueryData(['getMyProfile'], currentProfileData => {
                return { ...currentProfileData, ...updatedData };
            });

            return updatedData;
        },

        onSuccess: () => {
            navigate('/profile');
        },
        onError() {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });
    return profileMutation;
};

// COMMENT
// 코멘트 불러오기
export const useCommentQueryData = postId => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['getAllComment', postId],
        queryFn: () => getCommentAPI(postId),
        select: data => data.comments.reverse(),
    });
    return { data, isLoading, error };
};

// 코멘트 수정,삭제,추가
export const useCommentMutationData = postId => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const submitMutation = useMutation({
        mutationFn: commentData => postCommentAPI(postId, commentData.comment),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getAllComment', postId],
            });
        },
        onError() {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    const deleteMutation = useMutation({
        mutationFn: commentID => deleteCommentAPI(postId, commentID),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ['getAllComment', postId],
            });
        },
        onError() {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    const reporteMutation = useMutation({
        mutationFn: commentID => reportCommentAPI(postId, commentID),
        onSuccess() {
            dispatch(openAlertModal('댓글이 신고되었습니다.'));
        },
        onError() {
            dispatch(openAlertModal('잠시 후 다시 시도해주세요.'));
        },
    });

    return { submitMutation, deleteMutation, reporteMutation };
};
