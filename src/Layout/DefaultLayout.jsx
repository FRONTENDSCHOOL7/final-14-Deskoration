import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
const DefaultLayout = () => (
    <>
        <Header />
        <main style={{ padding: '0 25px' }}>
            <Outlet />
        </main>
        <Footer />
    </>
);

export default DefaultLayout;
