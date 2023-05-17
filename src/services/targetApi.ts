import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ObjectId } from "bson";
import { BaseURL } from "../utils/urlMgr";
import urlJoin from "url-join";
import { EntityTag } from "../utils/settings";
import { TStatusResponse, TTarget, TTargetModel } from "../utils/types";

const _URL = urlJoin(BaseURL, "management");

const targetApi = createApi({
	reducerPath: "targetApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
		credentials: "include",
	}),
	tagTypes: [EntityTag.TARGET],
	endpoints: (builder) => ({
		getTarget: builder.query<TTargetModel[], void>({
			query: () => ({
				url: "targets",
				method: "GET",
			}),
			providesTags: [EntityTag.TARGET],
		}),
		addTarget: builder.mutation<TStatusResponse, TTarget>({
			query: (target) => ({
				url: "target",
				method: "POST",
				body: target,
			}),
			invalidatesTags: [EntityTag.TARGET],
		}),
		moveToTrashTarget: builder.mutation<TStatusResponse, ObjectId>({
			query: (id) => ({
				url: `target?id=${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [EntityTag.TARGET],
		}),
	}),
});

export const { useGetTargetQuery, useAddTargetMutation, useMoveToTrashTargetMutation } = targetApi;
export default targetApi;
