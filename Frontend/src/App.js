import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { Fragment } from 'react';
import { DefaultLayout } from './components/Layout';

function App() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* user */}
                    {
                        publicRoutes.map((route, index) => {
                            let Layout = DefaultLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })
                    }
                    {/* admin */}
                    {   
                        privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<Page/>}
                                />
                            )
                        }) 
                    }
                </Routes>
            </div>
        </Router>
    );
}

export default App;
