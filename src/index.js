// REACT IMPORT
import React from 'react';
import ReactDOM from 'react-dom/client';
// REDUX IMPORT
// import { Provider } from 'react-redux'
// import store from './store/store';
// CONFIG IMPORT
import * as config from './utils/config'
// COMPONENT IMPORT
import NavBar from './components/nav-bar';
import ScanField from './components/scan-field';
import ProgressTable from './components/progress-table';
import TABLEHEAD_TS_ZAP from './components/tables/th-ts-zap';
import TABLEROW_TS_ZAP from './components/tables/tr-ts-zap';
import ProgressBar from './components/progress-bar';
// STYLE IMPORT
import './style/style.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <NavBar />
        <div id='body'>
            <section className='welcome-section'>
                <div className='welcome-content-container'>
                    <h2>
                        Lorem Ipsum is simply dummy text of the printing
                    </h2>
                    <div className='description'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </div>
                    <div className='free-scan-container'>
                        {/* TS = Traditional Spider */}
                        <ScanField title={config.TYPE_SCAN_NAME.TS_ZAP} typeScan="TS_ZAP" />
                        {/* <ProgressRing status={ProgressRing.COMPLETE}/> */}
                        <ProgressTable
                            tableHead={
                                <TABLEHEAD_TS_ZAP />
                            }
                            tableBody={
                                <>
                                <TABLEROW_TS_ZAP number="1" url="awdas" />
                                <TABLEROW_TS_ZAP number="2" url="loremasdasdqwgdnma absndbawdnkabdhw" />  
                                </>
                            } />
                    </div>
                </div>
            </section>
        </div>
    </>
    // <Provider store={store()}>
    //     <NavBar />
    //     <SearchBar/>
    //     <AdminTable />
    // </Provider>
);