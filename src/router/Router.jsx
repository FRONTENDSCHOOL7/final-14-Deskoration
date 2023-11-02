import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NewBoard from '../pages/NewBoard/NewBoard';
import Login from '../pages/User/Login';
import Signup from '../pages/User/Signup';
import User from '../pages/User/User';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/" element={<User />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>

                <Route path={'/home'} element={<Home />}></Route>

                <Route path={'/newboard'} element={<NewBoard />}></Route>
                <Route path="/newboard/:id" element={<NewBoard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
