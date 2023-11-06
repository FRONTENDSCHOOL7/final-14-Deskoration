import { React, lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const PublicRoutePage = lazy(() => import('./PublicRoute'));

const UserLayoutPage = lazy(() => import('../pages/User/User'));
const LoginPage = lazy(() => import('../pages/User/Login'));
const SignupPage = lazy(() => import('../pages/User/Signup'));
const UserPage = lazy(() => import('../pages/User/User'));
const ProfileUploadPage = lazy(() => import('../pages/Profile/ProfileUpload'));
const FollowerListPage = lazy(() =>
    import('../pages/FollowFollowingList/FollowerList'),
);
const FollowingListPage = lazy(() =>
    import('../pages/FollowFollowingList/FollowingList'),
);

const PrivateRoutePage = lazy(() => import('./PrivateRoute'));

const DefaultLayoutPage = lazy(() => import('../Layout/DefaultLayout'));
const HomePage = lazy(() => import('../pages/Home/Home'));
const FeedPage = lazy(() => import('../pages/Feed/Feed'));
const PostUploadPage = lazy(() => import('../pages/NewBoard/NewBoard'));
const DetailPostPage = lazy(() => import('../pages/DetailPost/DetailPost'));
const ChatListPage = lazy(() =>
    import('../pages/Chat/ChatListPage/ChatListPage'),
);
const ChatRoomPage = lazy(() =>
    import('../pages/Chat/ChatRoomPage/ChatRoomPage'),
);
const ProfilePage = lazy(() => import('../pages/Profile/Profile'));
const UserProfilePage = lazy(() => import('../pages/Profile/UserProfile'));

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
                            <Route path={'/chat'} element={<ChatListPage />} />
                            <Route
                                path={'/chat/:username'}
                                element={<ChatRoomPage />}
                            />
                            <Route
                                path={'/profile'}
                                element={<ProfilePage />}
                            />
                            <Route
                                path={'/profile/:username'}
                                element={<UserProfilePage />}
                            />
                        </Route>
                        <Route element={<NoFooterLayoutPage />}>
                            <Route
                                path={'/followerList'}
                                element={<FollowerListPage />}
                            />
                        </Route>
                    </Route>
                    <Route element={<NoFooterLayoutPage />}>
                        <Route
                            path={'/profileUpload'}
                            element={<ProfileUploadPage />}
                        />
                        <Route
                            path={'/followerList'}
                            element={<FollowerListPage />}
                        />
                        <Route
                            path={'/followingList'}
                            element={<FollowingListPage />}
                        />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Router;
