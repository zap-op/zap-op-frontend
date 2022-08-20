import * as config from '../utils/config'

import ScanField from '../components/scan-field';
import ProgressTable from '../components/progress-table';
import TABLEHEAD_TS_ZAP from '../components/tables/th-ts-zap';
import TABLEROW_TS_ZAP from '../components/tables/tr-ts-zap';
import ProgressBar from '../components/progress-bar';
import { useState } from 'react';

export default function Home() {
    return (
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
                    <ProgressTable
                        tableHead={
                            <TABLEHEAD_TS_ZAP />
                        }
                        tableBody={
                            <>
                                {/* {
                                    arrItem.map((item, index) =>
                                        <TABLEROW_TS_ZAP number={index} url={item} />
                                    )
                                } */}
                                <TABLEROW_TS_ZAP number="1" url="awdas" />
                                <TABLEROW_TS_ZAP number="2" url="loremasdasdqwgdnma absndbawdnkabdhw" />
                            </>
                        } />
                </div>
            </div>
        </section>
    )
}