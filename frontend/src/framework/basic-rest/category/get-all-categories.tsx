import { CategoriesQueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategories = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	

	try {
		// const { data: { data }, } = await http.get(API_ENDPOINTS.CATEGORIES);
		const response = await http.get('category');

		console.log(response.data)

		return { categories: { data: response.data as Category[] } };

	} catch(error) {
		console.log("data--------------------------------------------")
		console.log(error)
		console.log("data--------------------------------------------")
		return { categories: { data: [] } };
	}




};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {

	


	return useQuery<{ categories: { data: Category[] } }, Error>(
		[API_ENDPOINTS.CATEGORIES, options],
		fetchCategories
	);
};
