import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
const NoFooterLayout = () => (
    <>
        <Header />
        <main style={{ padding: '0 25px' }}>
            <Outlet />
        </main>
    </>
);

export default NoFooterLayout;
