import { useStreamSpiderScanQuery } from "../../../store";
import { ScanState, TAuthScanSession } from "../../../utils/types";
import ProgressTable from "../../ProgressTable";

type TStreamProgressTable = TAuthScanSession & {
	scanState: ScanState;
};

const StreamProgressTable = ({
	_id, //
	scanState,
	zapScanId,
	zapClientId,
}: TStreamProgressTable) => {};

type TZapSpiderProgressTable = TAuthScanSession & {
	scanState: ScanState;
};

export const ZapSpiderProgressTable = ({
	_id, //
	scanState,
	zapScanId,
	zapClientId,
}: TZapSpiderProgressTable) => {
	const {
		data, //
		error,
	} = useStreamSpiderScanQuery({
		_id, //
		scanState,
		zapScanId,
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
	_id, //
	scanState,
	zapScanId,
	zapClientId,
}: TZapAjaxProgressTable) => {
	const {
		data, //
		error,
	} = useStreamSpiderScanQuery({
		_id,
		scanState,
		zapScanId,
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
