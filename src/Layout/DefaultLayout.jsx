import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const DefaultLayout = () => {
    const location = useLocation();

    const isDetailPost = location.pathname.includes('/detailpost/');
    const isChatRoom = location.pathname.includes('/chat/');

    return (
        <>
            <Header />
            <main style={{ padding: '0 25px' }}>
                <Outlet />
            </main>
            {isDetailPost ? null : isChatRoom ? null : <Footer />}
        </>
    );
};

export default DefaultLayout;
