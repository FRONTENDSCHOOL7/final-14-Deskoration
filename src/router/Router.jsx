import { React, lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/Home/Home'));
const NewBoardPage = lazy(() => import('../pages/NewBoard/NewBoard'));
const LoginPage = lazy(() => import('../pages/User/Login'));
const SignupPage = lazy(() => import('../pages/User/Signup'));
const UserPage = lazy(() => import('../pages/User/User'));
const ProfileUploadPage = lazy(() => import('../pages/Profile/ProfileUpload'));
const ChatListPage = lazy(() =>
    import('../pages/Chat/ChatListPage/ChatListPage'),
);
const ChatRoomPage = lazy(() =>
    import('../pages/Chat/ChatRoomPage/ChatRoomPage'),
);
const ProfilePage = lazy(() => import('../pages/Profile/Profile'));
const UserProfilePage = lazy(() => import('../pages/Profile/UserProfile'));
const DetailPostPage = lazy(() => import('../pages/DetailPost/DetailPost'));
const PrivateRoutePage = lazy(() => import('./PrivateRoute'));
const PublicRoutePage = lazy(() => import('./PublicRoute'));
const DefaultLayoutPage = lazy(() => import('../Layout/DefaultLayout'));
const NoFooterLayoutPage = lazy(() => import('../Layout/NoFooterLayout'));

const Router = () => {
    return (
        <Suspense>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />

                    <Route path="/" element={<UserPage />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </Route>

                    <Route element={<DefaultLayoutPage />}>
                        <Route path={'/home/*'} element={<HomePage />} />
                        <Route path={'/chat'} element={<ChatListPage />} />
                        <Route path={'/profile'} element={<ProfilePage />} />
                        <Route
                            path={'/userProfile'}
                            element={<UserProfilePage />}
                        />
                        <Route path={'/newboard'} element={<NewBoardPage />} />
                        <Route
                            path={'/newboard/:id'}
                            element={<NewBoardPage />}
                        />
                        <Route
                            path={'/detailpost/:id'}
                            element={<DetailPostPage />}
                        />
                    </Route>

                    <Route element={<NoFooterLayoutPage />}>
                        <Route
                            path={'/chat/:username'}
                            element={<ChatRoomPage />}
                        />
                        <Route
                            path={'/profileUpload'}
                            element={<ProfileUploadPage />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default Router;
