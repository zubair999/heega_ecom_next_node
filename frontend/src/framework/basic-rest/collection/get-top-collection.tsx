import { CollectionsQueryOptionsType } from "@framework/types";
import { Collection } from "@framework/my_types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchTopCollections = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.COLLECTIONS);
	return data?.data as Collection[];
};
export const useCollectionsQuery = (options: CollectionsQueryOptionsType) => {
	return useQuery<Collection[], Error>(
		[API_ENDPOINTS.COLLECTIONS, options],
		fetchTopCollections
	);
};
