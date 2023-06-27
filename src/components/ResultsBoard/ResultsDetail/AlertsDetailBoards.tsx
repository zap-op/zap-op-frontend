import {
	RiskLevel, //
	TAlertDetail,
	TAlertsByRisk,
} from "../../../utils/types";
import PartBoard from "../../PartBoard";
import Describable from "../../toolkits/Describable";

type TAlertsDetailBoards = {
	alertsByRisk: TAlertsByRisk;
	alerts: TAlertDetail[];
	extendClassName?: string;
};

const AlertsDetailBoards = ({
	alerts, //
	alertsByRisk,
	extendClassName,
}: TAlertsDetailBoards) => {
	return (
		<div className={`alerts-detail-boards-container table-container ${extendClassName && extendClassName}`}>
			<PartBoard
				title="Alerts Summary"
				extendClassName="summary-alerts-container">
				<ul className="thead">
					<li className="risk-level">Risk Level</li>
					<li className="alerts-total">Alert Total</li>
				</ul>
				<ul className="trow">
					<li className="risk-level risk-high-style">High</li>
					<li className="alerts-total">{alertsByRisk.High?.length}</li>
				</ul>
				<ul className="trow">
					<li className="risk-level risk-medium-style">Medium</li>
					<li className="alerts-total">{alertsByRisk.Medium?.length}</li>
				</ul>
				<ul className="trow">
					<li className="risk-level risk-low-style">Low</li>
					<li className="alerts-total">{alertsByRisk.Low?.length}</li>
				</ul>
				<ul className="trow">
					<li className="risk-level risk-informational-style">Informational</li>
					<li className="alerts-total">{alertsByRisk.Informational?.length}</li>
				</ul>
			</PartBoard>
			<PartBoard
				title="Alerts Information"
				extendClassName="alerts-information-container">
				<ul className="thead">
					<li className="alert-name">Risk Name</li>
					<li className="risk-level">Risk Level</li>
					<li className="alerts-total">Instances Total</li>
				</ul>
				{Object.entries(alertsByRisk)
					.reverse()
					.map(([key, value]) =>
						value.map((item, index) => (
							<ul
								className="trow"
								key={index}>
								<li className="alert-name">
									<a href={`#${item.key}`}>{item.key}</a>
								</li>
								<li
									className={`risk-level ${
										key === RiskLevel.HIGH //
											? "risk-high-style"
											: key === RiskLevel.MEDIUM
											? "risk-medium-style"
											: key === RiskLevel.LOW
											? "risk-low-style"
											: "risk-informational-style"
									}`}>
									{key}
								</li>
								<li className="alerts-total">{item.value.length}</li>
							</ul>
						)),
					)}
			</PartBoard>
			<PartBoard
				title="Alerts Detail"
				extendClassName="alerts-detail-container">
				{Object.entries(alertsByRisk)
					.reverse()
					.map(([key, valueRiskArray]) =>
						valueRiskArray.map((risk, index) => {
							const pioneerAlertDetail = alerts[parseInt(risk.value[0].id)] || alerts.find((alert) => alert.id === risk.value[0].id);
							const listReference = pioneerAlertDetail.reference.split("\n");
							const listTagRecord = pioneerAlertDetail.tags;
							const CWEIDHref = `https://cwe.mitre.org/data/definitions/${pioneerAlertDetail.cweid}.html`;
							const pluginIdHref = `https://www.zaproxy.org/docs/alerts/${pioneerAlertDetail.pluginId}/`;
							return (
								<div
									key={index}
									id={risk.key}
									className="detail-block">
									<ul
										className={`thead ${
											key === RiskLevel.HIGH //
												? "risk-high-style"
												: key === RiskLevel.MEDIUM
												? "risk-medium-style"
												: key === RiskLevel.LOW
												? "risk-low-style"
												: "risk-informational-style"
										}`}>
										<li className="label">{key}</li>
										<li className="detail">{risk.key}</li>
									</ul>
									<ul className="trow">
										<li className="label">Description</li>
										<li className="detail read-text">{pioneerAlertDetail.description}</li>
									</ul>
									<ul className="trow">
										<li className="label">Instance</li>
										<li className="detail">{risk.value.length}</li>
									</ul>
									{risk.value.map((instance, index) => {
										const alertDetail = alerts[parseInt(instance.id)] || alerts.find((item) => item.id === instance.id);
										if (!alertDetail) {
											return <></>;
										}
										const instanceUrl = instance.url;
										return (
											<div
												key={index}
												className="instance detail-block">
												<span className="instance-index">{index}</span>
												<ul className="trow">
													<li className="label">Target</li>
													<li className="detail">
														<a
															href={instanceUrl}
															target="_blank"
															rel="noopener noreferrer">
															{instanceUrl}
														</a>
													</li>
												</ul>
												<ul className="trow">
													<li className="label">Method</li>
													<li className="detail">{alertDetail.method}</li>
												</ul>
												<ul className="trow">
													<li className="label">Parameter</li>
													<li className="detail">{instance.param}</li>
												</ul>
												<ul className="trow">
													<li className="label">Attack</li>
													<li className="detail">{alertDetail.attack}</li>
												</ul>
												<ul className="trow">
													<li className="label">Evidence</li>
													<li className="detail">{alertDetail.evidence}</li>
												</ul>
											</div>
										);
									})}
									<ul className="trow">
										<li className="label">Solution</li>
										<li className="detail read-text">{pioneerAlertDetail.solution}</li>
									</ul>
									<ul className="trow references">
										<li className="label">References</li>
										<li className="detail">
											{listReference.map((item, index) => (
												<a
													key={index}
													href={item}
													target="_blank"
													rel="noopener noreferrer"
													className="reference">
													{item}
												</a>
											))}
										</li>
									</ul>
									<ul className="trow tags">
										<li className="label">Tags</li>
										<li className="detail">
											{listTagRecord &&
												Object.entries(listTagRecord).map(([tag, tagRef]) => (
													<Describable
														key={tag}
														dataTitle={tagRef}>
														<a
															href={tagRef}
															target="_blank"
															rel="noopener noreferrer"
															className="tag">
															{tag}
														</a>
													</Describable>
												))}
										</li>
									</ul>
									<ul className="trow">
										<li className="label">CWE ID - Common Weakness Enumeration ID</li>
										<li className="detail">
											<Describable dataTitle={CWEIDHref}>
												<a
													href={CWEIDHref}
													target="_blank"
													rel="noopener noreferrer">
													{pioneerAlertDetail.cweid}
												</a>
											</Describable>
										</li>
									</ul>
									<ul className="trow">
										<li className="label">WASC ID - Web Application Security Consortium ID</li>
										<li className="detail">{pioneerAlertDetail.wascid}</li>
									</ul>
									<ul className="trow">
										<li className="label">Plugin ID</li>
										<li className="detail">
											<Describable dataTitle={pluginIdHref}>
												<a
													href={pluginIdHref}
													target="_blank"
													rel="noopener noreferrer">
													{pioneerAlertDetail.pluginId}
												</a>
											</Describable>
										</li>
									</ul>
								</div>
							);
						}),
					)}
			</PartBoard>
		</div>
	);
};

export default AlertsDetailBoards;
