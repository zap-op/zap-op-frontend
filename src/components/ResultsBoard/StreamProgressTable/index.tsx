import { useStreamSpiderScanQuery } from "../../../store";
import { ScanState, TAuthScanSession } from "../../../utils/types";
import ProgressTable from "../../ProgressTable";

type TStreamProgressTable = TAuthScanSession & {
	scanState: ScanState;
};

const StreamProgressTable = ({
	scanId, //
	scanState,
	scanSession,
}: TStreamProgressTable) => {
    
};

type TZapSpiderProgressTable = TAuthScanSession & {
	scanState: ScanState;
};

export const ZapSpiderProgressTable = ({
	scanId, //
	scanState,
	scanSession,
}: TZapSpiderProgressTable) => {
	const {
		data, //
		error,
	} = useStreamSpiderScanQuery({
		scanId,
		scanSession,
		scanState,
	});

	const {
		progress, //
		isScanning,
		data: streamData,
		error: responseError,
	} = { ...data };

	return (
		<ProgressTable
			tableBody={streamData?.map((item, index) => ({
				number: index,
				url: item,
			}))}
			options={{
				progress: {
					display: true,
					scanProgress: progress,
				},
				autoScroll: {
					display: true,
					initState: true,
				},
			}}
		/>
	);
};

type TZapAjaxProgressTable = TAuthScanSession & {
	scanState: ScanState;
};

export const ZapAjaxProgressTable = ({
	scanId, //
	scanState,
	scanSession,
}: TZapAjaxProgressTable) => {
	const {
		data, //
		error,
	} = useStreamSpiderScanQuery({
		scanId,
		scanState,
		scanSession,
	});

	const {
		progress, //
		isScanning,
		data: streamData,
		error: responseError,
	} = { ...data };

	return (
		<ProgressTable
			tableBody={streamData?.map((item, index) => ({
				number: index,
				url: item,
			}))}
			options={{
				progress: {
					display: true,
					scanProgress: progress,
				},
				autoScroll: {
					display: true,
					initState: true,
				},
			}}
		/>
	);
};
