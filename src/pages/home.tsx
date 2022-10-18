import ScanField from '../components/scan-field';
import ProgressTable from '../components/progress-table';
import TABLEHEAD_TS_ZAP from '../components/tables/th-ts-zap';
import TABLEROW_TS_ZAP from '../components/tables/tr-ts-zap';
import TS_ZAP from '../entities/ts-zap';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function Home() {
    const listScanInfo = useSelector((state: RootState) => state.scan.scanInfosDisplay);
    const scanProgress = useSelector((state: RootState) => state.scan.scanProgressDisplay);
    const isStartScanProgress = useSelector((state: RootState) => state.scan.isStartScanProgress);

    return (
        <div className='home-landing-container'>
            <section className='welcome-section'>
                <div className='welcome-content-container'>
                    <h1>
                        Lorem Ipsum is simply dummy text of the printing
                    </h1>
                    <div className='description'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </div>
                    <div className='free-scan-container'>
                        <ScanField title={TS_ZAP.fullName} typeScan={TS_ZAP.typeCode} />
                        {isStartScanProgress ? <ProgressTable
                            autoScrollState={ProgressTable.AUTO_SCROLL_ACTIVE}
                            scanProgress={scanProgress}
                            tableHead={<TABLEHEAD_TS_ZAP />}
                            tableBody={listScanInfo.map((item, index) => {
                                return <TABLEROW_TS_ZAP key={index} number={index} url={item} />
                            })} /> : <></>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;