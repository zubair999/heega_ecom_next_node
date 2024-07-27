import { QueryOptionsType } from "@framework/types";
import { NProduct } from "@framework/product_types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchRelatedProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.BEST_SELLER_PRODUCTS);
	return data?.data as NProduct[];
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
	return useQuery<NProduct[], Error>(
		[API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
		fetchRelatedProducts
	);
};