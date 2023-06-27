import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ScanType } from "./types";
import { ListScanOption } from "./settings";

export const isFetchBaseQueryErrorType = (obj: Object) => {
	return obj.hasOwnProperty("status") && (typeof (obj as FetchBaseQueryError).status === "number" || (obj as FetchBaseQueryError).status === "FETCH_ERROR" || "CUSTOM_ERROR" || "PARSING_ERROR");
};

export function _assertCast<T>(v: any): asserts v is T {}

export const getScanOptionTitleByID = (id: ScanType) => {
	const option = ListScanOption.find((item) => item.id == id);
	if (!option) {
		return "";
	}
	return option.title;
};

/**
 *
 * @param arr
 * @returns new array
 */
export const trimAllStringInArray = (arr: string[]) => {
	return arr.map((item) => item.trim());
};

/**
 *
 * @param arr
 * @returns changed array
 */
export const strimAllStringInArray = (arr: string[]) => {
	const x = arr.forEach((item) => item.trim());
	return x;
};
