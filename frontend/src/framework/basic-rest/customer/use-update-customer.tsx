import { useMutation } from 'react-query';
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";


interface UpdateUserType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  townCity: string;
  state: string;
  country: string;
  pincode: string;
  additionalInformation: string;
  isSubscribed: boolean;
  isTerm: boolean;
  isDefault: boolean
}

async function updateUser(input: UpdateUserType) {
	const { data } = await http.post(API_ENDPOINTS.ADD_ADDRESS, input);
  return data;
}


export const useUpdateUserMutation = () => {
  return useMutation((input: UpdateUserType) => updateUser(input), {
    onSuccess: (data) => {
      console.log("UpdateUser success response:", data);
      // Additional logic after successful mutation (e.g., show a success message)
    },
    onError: (error) => {
      console.error("UpdateUser error response:", error);
      // Additional error handling logic (e.g., show an error message)
    },
  });
};
