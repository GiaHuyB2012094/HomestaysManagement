import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: '75px' }}>
                <div className="content">{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
