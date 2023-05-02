import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ObjectId } from "bson";
import { TAG_TARGET, TTarget } from "../submodules/utility/model";
import { TStatusResponse } from "../submodules/utility/status";
import BaseURL from "../utils/BaseURL";

const _URL = new URL("management", BaseURL);

const targetApi = createApi({
	reducerPath: "targetApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL.href,
		credentials: "include",
	}),
	tagTypes: [TAG_TARGET],
	endpoints: (builder) => ({
		getTarget: builder.query<TTarget[], void>({
			query: () => ({
				url: "targets",
				method: "GET",
			}),
			providesTags: [TAG_TARGET],
		}),
		addTarget: builder.mutation<TStatusResponse, TTarget>({
			query: (target) => ({
				url: "target",
				method: "POST",
				body: target,
			}),
			invalidatesTags: [TAG_TARGET],
		}),
		moveToTrashTarget: builder.mutation<TStatusResponse, ObjectId>({
			query: (id) => ({
				url: `target?id=${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG_TARGET],
		}),
	}),
});

export const { useGetTargetQuery, useAddTargetMutation, useMoveToTrashTargetMutation } = targetApi;
export default targetApi;
