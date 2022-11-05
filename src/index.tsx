// REACT IMPORT
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// REDUX IMPORT
import { Provider } from 'react-redux'
import store from './store/store';
// CONFIG IMPORT
// COMPONENT IMPORT
import Home from './pages/home';
import SignUp from './pages/sign-up';
import LogIn from './pages/log-in';
// STYLE IMPORT
import './style/style.scss';
import AppBoard from './pages/app-board';
import LandingPage from './pages/landing-page';
import TargetsBoard from './components/dashboard/targets-board';
import ResultsBoard from './components/dashboard/results-board';
import ZAP from './entities/zap';
import TS_ZAP from './entities/ts-zap';
import ToolkitPortal from './components/toolkits/toolkit-potal';
import AddScanBoard from './components/dashboard/add-scan-board';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />}>
                    <Route index element={<Home />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='login' element={<LogIn />} />
                </Route>
                <Route path='app' element={<AppBoard />}>
                    <Route path='dashboard' element={<></>} />
                    <Route path='targets' element={
                        <TargetsBoard listTarget={[
                            {
                                name: "Lorem",
                                url: "https://lorem.com/",
                                tag: "dev",
                                firstSeen: "2 days ago",
                                lastSeen: "5 hours ago",
                            }, {
                                name: "Isum",
                                url: "https://isum.com/",
                                tag: "product",
                                firstSeen: "20 days ago",
                                lastSeen: "1 days ago",
                            }
                        ]} />
                    } />
                    <Route path='results' element={
                        <ResultsBoard listResult={[
                            {
                                name: "Lorem",
                                url: "https://lorem.com",
                                listScanType: [ZAP.fullName, TS_ZAP.fullName]
                            }, {
                                name: "Lorem",
                                url: "https://lorem.com",
                                listScanType: [ZAP.fullName, TS_ZAP.fullName]
                            }, {
                                name: "Lorem",
                                url: "https://lorem.com",
                                listScanType: [ZAP.fullName, TS_ZAP.fullName]
                            }
                        ]} />
                    } />
                    <Route path='addscan' element={<AddScanBoard/>} />
                    <Route path='wspsettings' element={<></>} />
                </Route>
            </Routes>
            <ToolkitPortal />
        </BrowserRouter>
    </Provider>
);