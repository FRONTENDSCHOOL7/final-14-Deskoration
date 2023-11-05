import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

// 추후 라우터 설정하면 라우터에 css적용할 예정입니다.
import './App.css';

import Router from './router/Router';

function App() {
    return (
        <div className="app-body">
            <div className="container">
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Router />
                </ThemeProvider>
            </div>
        </div>
    );
}

export default App;
