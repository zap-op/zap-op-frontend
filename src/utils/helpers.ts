import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export const isFetchBaseQueryErrorType = (obj: Object) => {
	return obj.hasOwnProperty("status") && (typeof (obj as FetchBaseQueryError).status === "number" || (obj as FetchBaseQueryError).status === "FETCH_ERROR" || "CUSTOM_ERROR" || "PARSING_ERROR");
};

export function _assertCast<T>(v: any): asserts v is T {}
