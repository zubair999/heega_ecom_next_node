import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchOrder = async (customer_id: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.ORDER}?customer_id=${customer_id}`);
  return data?.data
};

export const useOrderQuery = (customer_id: string) => {
  return useQuery<Order, Error>([API_ENDPOINTS.ORDER, customer_id], () =>
    fetchOrder(customer_id)
  );
};
