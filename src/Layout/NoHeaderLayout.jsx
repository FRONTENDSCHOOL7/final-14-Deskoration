import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const NoHeaderLayout = () => (
    <>
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
);

export default NoHeaderLayout;
