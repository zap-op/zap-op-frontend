// REACT IMPORT
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// REDUX IMPORT
import { Provider } from 'react-redux'
import store from './store/store';
// CONFIG IMPORT
// COMPONENT IMPORT
import Home from './pages/home/home-page';
import SignUp from './pages/signup/sign-up';
import LogIn from './pages/login/login-page';
// STYLE IMPORT
import './style/style.scss';
import AppBoard from './pages/app-board/app-board-page';
import LandingPage from './pages/landing-warp/landing-wrap';
import TargetsBoard from './components/boards/targets/targets-board';
import ResultsBoard from './components/boards/results/results-board';
import ZAP from './entities/zap';
import TS_ZAP from './entities/ts-zap';
import ToolkitPortal from './components/toolkits/toolkit/toolkit-portal';
import AddScanBoard from './components/boards/add-scan/add-scan-board';
import SelectTargetBoard from './components/boards/select-target/select-target-board';

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
                    <Route index path='dashboard' element={<></>} />
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
                    <Route path='addscan' element={
                        <AddScanBoard configSteps={[
                            {
                                title: "Select Targets",
                                state: SelectTargetBoard.NAME,
                            },
                            {
                                title: "Configure Scans",
                                state: "configure-scans-name",
                            },
                        ]} />
                    } />
                    <Route path='wspsettings' element={<></>} />
                </Route>
            </Routes>
            <ToolkitPortal />
        </BrowserRouter>
    </Provider >
);