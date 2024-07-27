import { FilterOptionsType } from "@framework/types";
import { Filter } from "@framework/my_types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCollectionFilter = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.FILTERS,  { params: _params });
	return data.data.options
};
export const useAllFilterQuery = (options: FilterOptionsType) => {
	return useQuery<Filter[], Error>(
		[API_ENDPOINTS.FILTERS, options],
		fetchCollectionFilter
	);
};
