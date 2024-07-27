import { NProduct } from "@framework/product_types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (_slug: any) => {
	const url = `${API_ENDPOINTS.PRODUCT}?${_slug}`;
	const { data } = await http.get(url);
	return data?.data;
};



export const useProductQuery = (slug: string) => {
	return useQuery<NProduct[], Error>([API_ENDPOINTS.PRODUCT, slug], () =>
		fetchProduct(slug)
	);
};

export const fetchSingleProduct = async (_slug: any) => {
	const url = `${API_ENDPOINTS.SINGLE_PRODUCT}?${_slug}`;
	const { data } = await http.get(url);
	return data?.data;
};

export const useSingleProductQuery = (slug: string) => {
	return useQuery<NProduct, Error>([API_ENDPOINTS.SINGLE_PRODUCT, slug], () =>
		fetchSingleProduct(slug)
	);
};

export const useFlashSaleProductsQuery = (slug: string) => {
	return useQuery<NProduct, Error>([API_ENDPOINTS.FLASH_SALE_PRODUCTS, slug], () =>
		fetchProduct(slug)
	);
};
