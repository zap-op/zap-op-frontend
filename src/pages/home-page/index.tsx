import ProgressTable from "../../components/progress-table";
import TABLEROW_TS_ZAP from "../../components/progress-table/tr-ts-zap";
import TS_ZAP from "../../entities/ts-zap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import landingImage from "../../assets/landing-image.svg";
import ScanField from "../../components/scan-field";

const HomePage = () => {
	const scanInfosDisplay = useSelector((state: RootState) => state.scan.scanInfosDisplay);
	const scanProgress = useSelector((state: RootState) => state.scan.scanProgressDisplay);

	return (
		<div className="home-page-container">
			<section className="welcome-section">
				<div className="welcome-content-container section-container">
					<div className="content-container">
						<div className="content-wrap">
							<h1>Welcome Lorem Ipsum is simply</h1>
							<div className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</div>
						</div>
						<a
							className="explore-now-button button primary-button"
							href="#"
							draggable={false}>
							Explore now
						</a>
					</div>
					<div className="landing-image-container">
						<div className="landing-image">
							<img
								src={landingImage}
								alt="landing-image.svg"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="trial-section">
				<div className="trial-container section-container">
					<h2>Take a Free Trial with</h2>
					<div className="free-scan-container">
						<div className="home_scan-field-container">
							<ScanField
								title={TS_ZAP.fullName}
								typeScan={TS_ZAP.typeCode}
							/>
						</div>
						{scanProgress ? (
							<ProgressTable
								initAutoScrollState={ProgressTable.AUTO_SCROLL_ACTIVE}
								scanProgress={scanProgress}
								tableBody={scanInfosDisplay.map((item, index) => {
									return (
										<TABLEROW_TS_ZAP
											key={index}
											number={index}
											url={item}
										/>
									);
								})}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
