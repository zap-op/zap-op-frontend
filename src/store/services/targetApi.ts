import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ObjectId } from "bson";
import { BaseURL } from "../../utils/urlMgr";
import urlJoin from "url-join";
import { TARGET_TAG } from "../../utils/settings";
import {
	TTarget, //
	TTargetModel,
	TStatusResponse,
} from "../../utils/types";

const _URL = urlJoin(BaseURL, "management");

const targetApi = createApi({
	reducerPath: "targetApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
		credentials: "include",
	}),
	tagTypes: [TARGET_TAG],
	endpoints: (builder) => ({
		getTarget: builder.query<TTargetModel[], void>({
			query: () => ({
				url: "targets",
				method: "GET",
			}),
			providesTags: [TARGET_TAG],
		}),
		addTarget: builder.mutation<TStatusResponse, TTarget>({
			query: (target) => ({
				url: "target",
				method: "POST",
				body: target,
			}),
			invalidatesTags: [TARGET_TAG],
		}),
		moveToTrashTarget: builder.mutation<TStatusResponse, ObjectId>({
			query: (id) => ({
				url: `target?id=${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [TARGET_TAG],
		}),
	}),
});

export const {
	useGetTargetQuery, //
	useAddTargetMutation,
	useMoveToTrashTargetMutation,
} = targetApi;
export default targetApi;
