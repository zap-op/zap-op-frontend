import jsPDF from "jspdf";
import moment from "moment";
import autoTable, { CellInput, Color, RowInput } from "jspdf-autotable";
import {
	ScanType, //
	ExtractArrayItemType,
	TMgmtScanSessionsResponse,
	TZapActiveScanFullResults,
	RiskLevel,
} from "../../utils/types";
import { _assertCast, getScanOptionTitleByID } from "../../utils/helpers";

const HIGH_COLOR: Color = [255, 73, 73];
const MEDIUM_COLOR: Color = [255, 164, 0];
const LOW_COLOR: Color = [220, 247, 99];
const INFORMATIONAL_COLOR: Color = [0, 102, 255];

const FONT_SIZE = 14;

const getFinalY = (doc: jsPDF) => (doc as any).lastAutoTable.finalY || FONT_SIZE;

const getColorByRiskLevel = (str: string) => {
	switch (str) {
		case RiskLevel.HIGH:
			return HIGH_COLOR;
		case RiskLevel.MEDIUM:
			return MEDIUM_COLOR;
		case RiskLevel.LOW:
			return LOW_COLOR;
		case RiskLevel.INFORMATIONAL:
			return INFORMATIONAL_COLOR;
		default:
			return "";
	}
};

type TActiveFullResult = TZapActiveScanFullResults["fullResults"];

type TSessionInfo = ExtractArrayItemType<TMgmtScanSessionsResponse>;

function generateResultDetailDocument(doc: jsPDF, resultType: ScanType.ZAP_SPIDER, sessionInfo: TSessionInfo, fullResults?: any): any;
function generateResultDetailDocument(doc: jsPDF, resultType: ScanType.ZAP_AJAX, sessionInfo: TSessionInfo, fullResults?: any): any;
function generateResultDetailDocument(doc: jsPDF, resultType: ScanType.ZAP_PASSIVE, sessionInfo: TSessionInfo, fullResults?: any): any;
function generateResultDetailDocument(doc: jsPDF, resultType: ScanType.ZAP_ACTIVE, sessionInfo: TSessionInfo, fullResults: TActiveFullResult): any;
function generateResultDetailDocument(doc: jsPDF, resultType: ScanType, sessionInfo: TSessionInfo, fullResults: TActiveFullResult | any) {
	// const toastId = toast.loading("Generating pdf");

	let finalY = getFinalY(doc);
	doc.setFontSize(FONT_SIZE);

	generateSessionInfomation(doc, finalY, sessionInfo);

	finalY = getFinalY(doc);

	switch (resultType) {
		case ScanType.ZAP_SPIDER:
		case ScanType.ZAP_AJAX:
			return 0;
		case ScanType.ZAP_PASSIVE:
		case ScanType.ZAP_ACTIVE:
			_assertCast<TActiveFullResult>(fullResults);
			generateAlertsSummaryDocument(doc, finalY + FONT_SIZE, fullResults);
			finalY = getFinalY(doc);
			generateAlertsInformationDocument(doc, finalY + FONT_SIZE, fullResults);
			finalY = getFinalY(doc);
			generateAlertsDetailDocument(doc, finalY + FONT_SIZE, fullResults);
			return 0;
		default:
			return 0;
	}

	// 			{/* {<ZapSpiderConfig scanConfig={sessionInfo["scanConfig"] as TZapSpiderScanConfig["scanConfig"]} />} */}
}

const generateSessionInfomation = (doc: jsPDF, finalY: any, sessionInfo: TSessionInfo) => {
	doc.text("Session infomation", FONT_SIZE, finalY);
	autoTable(doc, {
		startY: finalY + FONT_SIZE / 4,
		body: [
			["Scan Session", sessionInfo._id.toString()],
			["Type", getScanOptionTitleByID(sessionInfo.__t as ScanType)],
			["Target Name", sessionInfo.targetPop.name],
			["Target", sessionInfo.targetPop.target],
			["Tags", sessionInfo.targetPop.tag || ["test1", "test2"]],
			["Update At", moment(sessionInfo.updatedAt).format("LLLL") + " UTC" || ""],
			["Create At", moment(sessionInfo.createdAt).format("LLLL") + " UTC" || ""],
		],
	});
};

const generateAlertsSummaryDocument = (doc: jsPDF, finalY: any, fullResults: TActiveFullResult) => {
	doc.text("Alerts Summary", FONT_SIZE, finalY);
	autoTable(doc, {
		rowPageBreak: "avoid",
		startY: finalY + FONT_SIZE / 4,
		head: [
			[
				{
					content: "Risk Level",
					styles: {
						halign: "center",
					},
				},
				{
					content: "Alert Total",
					styles: {
						halign: "center",
					},
				},
			],
		],
		body: [
			[
				{
					content: "High",
					styles: {
						fillColor: HIGH_COLOR,
					},
				},
				{
					content: fullResults.alertsByRisk.High?.length || 0,
					styles: {
						halign: "center",
					},
				},
			],
			[
				{
					content: "Medium",
					styles: {
						fillColor: MEDIUM_COLOR,
					},
				},
				{
					content: fullResults.alertsByRisk.Medium?.length || 0,
					styles: {
						halign: "center",
					},
				},
			],
			[
				{
					content: "Low",
					styles: {
						fillColor: LOW_COLOR,
					},
				},
				{
					content: fullResults.alertsByRisk.Low?.length || 0,
					styles: {
						halign: "center",
					},
				},
			],
			[
				{
					content: "Informational",
					styles: {
						fillColor: INFORMATIONAL_COLOR,
					},
				},
				{
					content: fullResults.alertsByRisk.Informational?.length || 0,
					styles: {
						halign: "center",
					},
				},
			],
		],
	});
};

const generateAlertsInformationDocument = (doc: jsPDF, finalY: any, fullResults: TActiveFullResult) => {
	const headContentArray = ["Risk Name", "Risk Level", "Instances Total"];
	const headRows: RowInput[] = [
		headContentArray.map(
			(item) =>
				({
					content: item,
					styles: {
						halign: "center",
					},
				} as CellInput),
		),
	];

	const bodyRows: RowInput[] = [];
	Object.entries(fullResults.alertsByRisk)
		.reverse()
		.map(([key, value]) =>
			value.map((item) => {
				const riskStyleColor = getColorByRiskLevel(key);
				bodyRows.push([
					item.key,
					{
						content: key,
						styles: {
							fillColor: riskStyleColor,
							halign: "center",
						},
					},
					{
						content: item.value.length,
						styles: {
							halign: "center",
						},
					},
				] as RowInput);
			}),
		);
	doc.text("Alerts Information", FONT_SIZE, finalY);
	autoTable(doc, {
		rowPageBreak: "avoid",
		startY: finalY + FONT_SIZE / 4,
		head: headRows,
		body: bodyRows,
	});
};

const generateAlertsDetailDocument = (doc: jsPDF, finalY: any, fullResults: TActiveFullResult) => {
	doc.text("Alerts Detail", FONT_SIZE, finalY);
	finalY = finalY + FONT_SIZE / 4;

	const {
		alerts, //
		alertsByRisk,
	} = fullResults;
	Object.entries(alertsByRisk)
		.reverse()
		.map(([key, valueRiskArray]) =>
			valueRiskArray.map((risk) => {
				const pioneerAlertDetail = alerts[parseInt(risk.value[0].id)];
				const riskStyleColor = getColorByRiskLevel(key);
				const CWEIDHref = `https://cwe.mitre.org/data/definitions/${pioneerAlertDetail.cweid}.html`;
				const pluginIdHref = `https://www.zaproxy.org/docs/alerts/${pioneerAlertDetail.pluginId}/`;
				const bodyRows: RowInput[] = [
					[key, risk.key].map((item, index) => {
						if (index === 0) {
							return {
								content: item,
								styles: {
									fillColor: riskStyleColor,
									cellWidth: 30,
								},
							} as CellInput;
						}
						return {
							content: item,
							styles: {
								fillColor: riskStyleColor,
							},
						} as CellInput;
					}),
					["Description", pioneerAlertDetail.description],
					["Solution", pioneerAlertDetail.solution.replaceAll("\n", "\n\n")],
					["References", pioneerAlertDetail.reference.replaceAll("\n", "\n\n")],
					[
						"Tags",
						pioneerAlertDetail.tags
							? Object.entries(pioneerAlertDetail.tags)
									.map(([tag, tagRef]) => tag + "\n" + tagRef)
									.toString()
									.replaceAll(",", "\n\n")
							: "",
					],
					["CWE ID - Common Weakness Enumeration ID", pioneerAlertDetail.cweid + "\n" + CWEIDHref],
					["WASC ID - Web Application Security Consortium ID", pioneerAlertDetail.wascid],
					["Plugin ID", pioneerAlertDetail.pluginId + "\n" + pluginIdHref],
					["Instance", risk.value.length],
				];

				autoTable(doc, {
					rowPageBreak: "avoid",
					startY: finalY,
					body: bodyRows,
				});

				finalY = getFinalY(doc) + FONT_SIZE / 8;
				risk.value.map((instance, index) => {
					const alertDetail = alerts[parseInt(instance.id)] || alerts.find((item) => item.id === instance.id);
					if (!alertDetail) {
						return;
					}
					const instanceBody: RowInput[] = [
						[
							{
								content: index,
								rowSpan: 5,
								styles: {
									valign: "middle",
									halign: "center",
									fillColor: INFORMATIONAL_COLOR,
									cellWidth: 10,
								},
							},
							{
								content: "Target",
								styles: {
									cellWidth: 30,
								},
							},
							instance.url,
						],
						["Method", alertDetail.method],
						["Parameter", instance.param],
						["Attack", alertDetail.attack],
						["Evidence", alertDetail.evidence],
					];

					const marginInline = FONT_SIZE * 3;
					autoTable(doc, {
						rowPageBreak: "avoid",
						startY: finalY,
						margin: [0, FONT_SIZE, 0, marginInline],
						body: instanceBody,
					});
					finalY = getFinalY(doc) + FONT_SIZE / 6;
				});
				finalY = getFinalY(doc) + FONT_SIZE / 2;
			}),
		);
};

export { generateResultDetailDocument };
