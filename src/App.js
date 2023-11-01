import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Home from './pages/Home/Home';
import Board from './pages/Board/Board';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/User/Signup';

// 추후 라우터 설정하면 라우터에 css적용할 예정입니다.
import './App.css';
import ProfileUpload from './pages/Profile/ProfileUpload';
function App() {
    return (
        <div className="app-body">
            <div className="container">
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <BrowserRouter>
                        <Routes>
                            <Route path={'/home'} element={<Home />}></Route>
                            <Route path={'/board'} element={<Board />}></Route>
                            <Route
                                path={'/signup'}
                                element={<Signup />}
                            ></Route>
                            <Route
                                path={'/profileUpload'}
                                element={<ProfileUpload />}
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default App;
