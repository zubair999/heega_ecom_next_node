import { CollectionsQueryOptionsType } from "@framework/types";
import { Collection } from "@framework/my_types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCollections = async (_slug: string) => {
	const url = `${API_ENDPOINTS.COLLECTIONS}`;
	const { data } = await http.get(url);
	return data?.data;
};
export const useCollectionsQuery = (slug: string) => {
	return useQuery<Collection[], Error>([API_ENDPOINTS.COLLECTIONS, slug], () =>
		fetchCollections(slug)
	);
};
