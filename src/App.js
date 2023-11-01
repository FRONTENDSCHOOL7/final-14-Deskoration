import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 추후 라우터 설정하면 라우터에 css적용할 예정입니다.
import './App.css';
import User from './pages/User/User';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';
import NewBoard from './pages/NewBoard/NewBoard';

const token = sessionStorage.getItem('tempToken');
function App() {
    return (
        <div className="app-body">
            <div className="container">
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/login" replace />}
                            />
                            {token ? (
                                <>
                                    <Route
                                        path={'/home'}
                                        element={<Home />}
                                    ></Route>
                                    <Route
                                        path={'/newboard'}
                                        element={<NewBoard />}
                                    ></Route>
                                    <Route
                                        path="/newboard/:id"
                                        element={<NewBoard />}
                                    />
                                </>
                            ) : (
                                <Route path="/" element={<User />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/signup"
                                        element={<Signup />}
                                    />
                                </Route>
                            )}
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default App;
