import { React, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
const PublicRoutePage = lazy(() => import('./PublicRoute'));
const UserLayoutPage = lazy(() => import('../pages/AuthPage/AuthPage'));
const LoginPage = lazy(() => import('../components/Auth/Login'));
const SignupPage = lazy(() => import('../components/Auth/Signup'));
const ProfileUploadPage = lazy(() =>
    import('../pages/ProfileUploadPage/ProfileUpload'),
);
const FollowerListPage = lazy(() => import('../pages/FollowPage/FollowerList'));
const FollowingListPage = lazy(() =>
    import('../pages/FollowPage/FollowingList'),
);
const PrivateRoutePage = lazy(() => import('./PrivateRoute'));
const DefaultLayoutPage = lazy(() => import('../Layout/DefaultLayout'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const FeedPage = lazy(() => import('../pages/FeedPage/Feed'));
const PostUploadPage = lazy(() =>
    import('../pages/PostPage/AddPostPage/AddPostPage'),
);
const DetailPostPage = lazy(() =>
    import('../pages/PostPage/DetailPostPage/DetailPostPage'),
);
const ProductPage = lazy(() => import('../pages/ProductPage/Product'));
const ChatListPage = lazy(() =>
    import('../pages/ChatPage/ChatListPage/ChatListPage'),
);
const ChatRoomPage = lazy(() =>
    import('../pages/ChatPage/ChatRoomPage/ChatRoomPage'),
);
const ProfilePage = lazy(() => import('../pages/ProfilePage/Profile'));
const NoFooterLayoutPage = lazy(() => import('../Layout/NoFooterLayout'));
const NotFoundPage = lazy(() => import('../pages/404/NotFoundPage'));

const Router = () => {
    return (
        <Suspense>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicRoutePage />}>
                        <Route path="/" element={<UserLayoutPage />}>
                            <Route
                                path="/"
                                element={<Navigate to="/login" replace />}
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                        </Route>
                    </Route>
                    <Route element={<PrivateRoutePage />}>
                        <Route element={<DefaultLayoutPage />}>
                            <Route path={'/home'} element={<HomePage />} />
                            <Route path={'/feed'} element={<FeedPage />} />
                            <Route
                                path={'/postUpload'}
                                element={<PostUploadPage />}
                            />
                            <Route
                                path={'/postUpload/:itemCount'}
                                element={<PostUploadPage />}
                            />
                            <Route
                                path={'/detailPost/:id'}
                                element={<DetailPostPage />}
                            />
                            <Route
                                path={'/detailPost/:id/:itemCount'}
                                element={<ProductPage />}
                            />
                            <Route
                                path={'/postEdit/:id'}
                                element={<PostUploadPage />}
                            />
                            <Route
                                path={'/postEdit/:id/:itemCount'}
                                element={<PostUploadPage />}
                            />
                            <Route path={'/chat'} element={<ChatListPage />} />
                            <Route
                                path={'/chat/:roomId'}
                                element={<ChatRoomPage />}
                            />
                            <Route
                                path={'/chat/:id'}
                                element={<ChatRoomPage />}
                            />
                            <Route
                                path={'/profile'}
                                element={<ProfilePage />}
                            />
                        </Route>
                        <Route element={<NoFooterLayoutPage />}>
                            <Route
                                path={'/followerList'}
                                element={<FollowerListPage />}
                            />
                            <Route
                                path={'/followingList'}
                                element={<FollowingListPage />}
                            />
                            <Route
                                path={'/followerList/:username'}
                                element={<FollowerListPage />}
                            />
                            <Route
                                path={'/followingList/:username'}
                                element={<FollowingListPage />}
                            />
                        </Route>
                    </Route>
                    <Route element={<NoFooterLayoutPage />}>
                        <Route
                            path={'/profileUpload'}
                            element={<ProfileUploadPage />}
                        />
                        <Route
                            path={'/profileEdit'}
                            element={<ProfileUploadPage />}
                        />
                        <Route
                            path={'/profile/:username'}
                            element={<ProfilePage />}
                        />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};
export default Router;
