import { Order } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery, useQueryClient, useMutation } from "react-query";

type ORDER = {
  total: number;
  order_id: string;
  customer_id: string;
  items: ORDERITEM[];
}

type ORDERITEM = {
  id: string;
  title: string;
  variant: string;
  price: number;
  image: string;
  quantity: number;
  key: number;
  itemTotal: number;
}


export const addOrder = async (payload: ORDER) => {
  const { data } = await http.post(`${API_ENDPOINTS.ADD_ORDER}`, payload);
  return data;
};


export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: addOrder,
      //client side optimistic update
      onMutate: (brand_id) => {
          // queryClient.setQueryData(['brand'], (prevBrand : any) => prevBrand?.filter((brand) => brand_id.id !== brand));
      },
      onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['order'] });
      }, //refetch users after mutation, disabled for demo
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['order'] });
      },
      onError: (error) => {
          queryClient.invalidateQueries('order');
      }
  });
}