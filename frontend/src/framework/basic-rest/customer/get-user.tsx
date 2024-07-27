import { NProduct } from "@framework/product_types";
import { User } from "@framework/my_types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchUser = async (id: string) => {
	const url = `${API_ENDPOINTS.USER}/${id}`;	
	const { data } = await http.get(url);
	return data?.data;
};

export const useUserQuery = (id: string) => {
	return useQuery<User, Error>([API_ENDPOINTS.USER, id], () =>
		fetchUser(id)
	);
};


