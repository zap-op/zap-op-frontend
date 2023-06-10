import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/landing-image.svg";
import { useSelector, trialScanApi } from "../../store";
import { ProgressTable, ScanField } from "../../components";

const HomePage = () => {
	const { target } = useSelector((state) => state.scan.trial);
	const {
		data: {
			progress, //
			isScanning,
			data: trialScanData,
		} = {},
	} = trialScanApi.endpoints.trialScan.useQueryState({
		target,
	});

	const [isDisplayStreamBoard, setIsDisplayStreamBoard] = useState<boolean>(false);

	useEffect(() => {
		if (!isDisplayStreamBoard && isScanning) {
			setIsDisplayStreamBoard(true);
		}
	}, [isScanning]);

	return (
		<div className="home-page-container">
			<section className="welcome-section">
				<div className="welcome-content-container section-container">
					<div className="content-container">
						<div className="content-wrap">
							<h1>Owlens</h1>
							<div className="description">An automated web application security scanner based on the OWASP ZAP platform</div>
						</div>
						<Link
							className="explore-now-button button primary-button"
							to="/login"
							draggable={false}>
							Explore now
						</Link>
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
			<section
				id="trial"
				className="trial-section">
				<div className="trial-container section-container">
					<h2>Take a Free Trial with</h2>
					<div className="description">
						<b>Traditional ZAP Spider</b> to inspects HTML in a web application's response to detect links
					</div>
					<div className="free-scan-container">
						<div className="home_scan-field-container">
							<ScanField typeScan="zap-spider" />
						</div>
						{isDisplayStreamBoard ? (
							<ProgressTable
								options={{
									progress: {
										display: true,
										scanProgress: progress ? progress : 0,
									},
									autoScroll: {
										display: true,
										initState: true,
									},
								}}
								tableBody={trialScanData?.map((item, index) => ({
									number: index,
									url: item,
								}))}
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
