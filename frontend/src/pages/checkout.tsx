import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useCart } from "@contexts/cart/cart.context";
import { useCreateOrder } from "@framework/order/add-order";
import { useUserQuery } from "@framework/customer/get-user";
import { useUpdateUserMutation, UpdateUserType } from "@framework/customer/use-update-customer";
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from "@components/ui/button";
import { useRouter } from "next/router";



interface User {
  id: number;
  name: string;
}

interface Props {
  data: User[];
}

const state_list = [
  { code: 'AL', name: 'Oklahoma' },
  { code: 'AK', name: 'New York' },
];

const country_list = [
  { code: 'USA', name: 'USA' },
  { code: 'IN', name: 'India' },
];

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	countryCode: string;
	address: string;
	city: string;
	state: string;
	country: string;
	pincode: string;
	additionalInfo?: string;
	isSubscribed?: string;
	isTerm: boolean;
  }

  interface Country {
    name: string;
    phone_code: string
}

interface State {
    name: string;
    country_name: string;
}
  

export default function CheckoutPage() {
	const {  register, handleSubmit, watch,  setError, setValue, clearErrors, getValues, control, formState: { errors } } = useForm<FormData>();
  const { items, total, isEmpty } = useCart();
  const { mutateAsync: addOrder, isLoading:isOrderLoading, isError, isIdle, isPaused, isSuccess, reset} = useCreateOrder();
  const query1 = "1";
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data, isLoading: isUserLoading, error } = useUserQuery(session?.user?.email as string);

  const firstName = data?.addresses ? data?.addresses[0]?.firstname : ""
  const lastname = data?.addresses ? data?.addresses[0]?.lastname : ""
  const email = data?.addresses ? data?.addresses[0]?.email : ""
  const phoneNumber = data?.addresses ? data?.addresses[0]?.phoneNumber : ""
  const streetAddress = data?.addresses ? data?.addresses[0]?.streetAddress : ""
  const townCity = data?.addresses ? data?.addresses[0]?.townCity : ""
  const state = data?.addresses ? data?.addresses[0]?.state : ""
  const country = data?.addresses ? data?.addresses[0]?.country : ""
  const pincode = data?.addresses ? data?.addresses[0]?.pincode : ""
  const additionalInformation = data?.addresses ? data?.addresses[0]?.additionalInformation : ""
  const isSubscribed = data?.addresses ? data?.addresses[0]?.isSubscribed : false
  const isTerm = data?.addresses ? data?.addresses[0]?.isTerm : false
  const isDefault = data?.addresses ? data?.addresses[0]?.isDefault : false

  const [paymentMethod, setPaymentMethod] = React.useState("razorpay")
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [states, setStates] = React.useState<State[]>([]);

  

  useEffect(() => {
    setValue("firstName", firstName);
    setValue("lastName", lastname);
    setValue("email", email);
    setValue("phoneNumber", phoneNumber);
    setValue("address", streetAddress);
    setValue("city", townCity);
    setValue("state", state);
    setValue("country", country);
    setValue("pincode", pincode);
    setValue("additionalInfo", additionalInformation);
    setValue("isSubscribed", isSubscribed);
    setValue("isTerm", isTerm);
}, [data]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
      const data = await response.json();

      const transformedCountries = data.map((country : Country) => ({
          name: country.name,
          phone_code: country.phone_code
      }));
      setCountries(transformedCountries);
    } catch (error) {
      console.error('Error fetching JSON:', error);
    }
  };

  useEffect(() => {
    fetchCountries()
  }, [])
  
  useEffect(() => {
    const fetchStates = async () => {
        if (watch("country")) {
            try {
                const response = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json');
                const dataS = await response.json();
                const filteredStates = dataS.filter((state: State ) => state.country_name === watch("country"));
                const transformedState = filteredStates.map((state : State) => ({
                  name: state.name 
                }));
                setStates(transformedState);
            } catch (error) {
                console.error('Error fetching states data: ', error);
            }
        } else {
            setStates([]);
        }
    };

    fetchStates();
}, [watch("country")]);

  useEffect(() => {
    const loadRazorPayScript = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        }
      } catch(error) {
        console.log("script err")
        console.log(error)
      }
    }

    loadRazorPayScript()
  }, [])

  type ORDER = {
    order_id: string;
    customer_id: string;
    total: number;
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

  

  const { 
      mutate: updateAddress, 
      isLoading: isAddressLoading, 
      isError: isAddressError, 
      isSuccess: isAddressSuccess 
    } = useUpdateUserMutation();


    console.log("order is creating")
    console.log(isOrderLoading)

  const onSubmit: SubmitHandler<FormData> = async (data2 : UpdateUserType) => {
    console.log(data?._id)
    // const orderData
    console.log(items)
    // addOrder()
    
    
    try {
      data2.isDefault = true
      data2._id = data?._id
      await updateAddress(data2);
      if(paymentMethod == "razorpay" ) {
        paymentHandlerRazorpay()
      } else {
        paymentHandlerCcavenue()
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const paymentHandlerCcavenue = async () => {
    console.log("payment by ccavanue")
  }


  const amount = (total+150) * 100;
  const currency = "INR";
  const receiptId = "heegaihate1";

  const paymentHandlerRazorpay = async () => {
    const response = await fetch("http://localhost:8000/api/orders/create", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();

    var options = {
      key: "rzp_test_F1mIYCTUq0Hpjw", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Heegasports Pvt Ltd", //your business name
      description: "Test Transaction",
      image: "https://heegasports.com/wp-content/uploads/2022/06/For-website.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response :any) {
        const body = {
          ...response,
        };

        const validateRes = await fetch("http://localhost:8000/order/validate", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log("save order to database")
        console.log(jsonRes);
        console.log(response);

        const orderData: ORDER = {
          total: total,
          order_id: response?.razorpay_order_id,
          customer_id: data?._id ?? "",
          items: items
        }
        await addOrder(orderData)
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Zubair", //your customer's name
        email: "zubair@example.com",
        contact: "9897753786", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Heega Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      // redirect: true,
      // callback_url: "https://localhost:3000/my-account/orders/" + order.id,
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    // e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full max-w-screen-lg flex space-x-6">
          {/* Left side: Billing & Shipping Form */}
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-4">Billing & Shipping</h2>
            
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    // defaultValue={firstName}
                    defaultValue={getValues("firstName")}
                    type="text"
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="Enter firstname"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    defaultValue={getValues("lastName")}
                    type="text"
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Enter lastname"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  // defaultValue={email}
                  defaultValue={getValues("email")}
                  type="email"
                  id="email"
                  {...register('email', { required: 'Email is required' })}
                  placeholder="Enter email address"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>


<div>
  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
    Phone Number
  </label>
  <div className="flex">
    <select
      id="countryCode"
      defaultValue="+91" // Default value set to +91 (India)
      {...register('countryCode', { required: 'Country code is required' })}
      className="block w-1/4 mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm appearance-none"
      style={{ height: 'calc(2rem + 5px)', marginTop:4 }} // Adjust height as needed
    >
      <option value="+91">+91 (India)</option>
      {/* <option value="+1">+1 (USA)</option>
      <option value="+44">+44 (UK)</option>
      <option value="+61">+61 (Australia)</option>
      <option value="+81">+81 (Japan)</option> */}
      {/* Add more options as needed */}


      {countries.map(country => (
      <option key={country.name} value={country.phone_code}>
        {country.phone_code} ({country.name})
      </option>
    ))}


    </select>
    <input
      defaultValue={getValues("phoneNumber")}
      type="tel"
      id="phoneNumber"
      {...register('phoneNumber', { required: 'Phone number is required' })}
      placeholder="123-456-7890"
      className="flex-1 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
      // style={{ height: 'calc(1.5rem + 2px)' }} // Adjust height as needed to match select
    />
  </div>
  {/* Error message for phone number */}
  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
</div>



              <div>
  
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <textarea
                  // defaultValue={streetAddress}
                  defaultValue={getValues("address")}
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                  rows={3}
                  placeholder="123 Street"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Town / City
                  </label>
                  <input
                    // defaultValue={townCity}
                    defaultValue={getValues("city")}
                    type="text"
                    id="city"
                    {...register('city', { required: 'City is required' })}
                    placeholder="City"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                
                <div className="w-1/2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    defaultValue={watch("country")}
                    rules={{ required: 'Country is required' }}
                    render={({ field }) => (
                      <select
                        id="country"
                        {...field}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                        {...register("country")}
                        value={watch("country")}
                      >
                        <option value="" key={""}>Select Country</option>

                        

                        {countries.map(country => (
                          <option key={country.name} value={country.name}>
                            {country.name}
                          </option>
                        ))}

                        
                        
                      </select>
                    )}
                  />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                </div>


                



              </div>


              

              <div className="flex space-x-4">
                
                
              <div className="w-1/2">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <Controller
                    name="state"
                    control={control}
                    defaultValue={watch("state")}
                    rules={{ required: 'State is required' }}
                    render={({ field }) => (
                      <select
                        id="state"
                        {...field}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                        {...register("state")}
                        value={watch("state")}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                </div>



                <div className="w-1/2">
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    defaultValue={pincode}
                    type="text"
                    id="pincode"
                    {...register('pincode', { required: 'Pincode is required' })}
                    placeholder="123456"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  defaultValue={additionalInformation}
                  id="additionalInfo"
                  {...register('additionalInfo')}
                  rows={4}
                  placeholder="Enter any additional information here"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-black sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  defaultChecked={isSubscribed == true ? "true" : "false"}
                  type="checkbox"
                  id="isSubscribed"
                  {...register('isSubscribed')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="isSubscribed" className="ml-2 block text-sm text-gray-900">
                  Yes, I'm ok with you sending me additional newsletter and email content (optional)
                </label>
              </div>
              
            
          </div>

          {/* Right side: Your Order */}
          <div className="w-1/2">
            <div className="bg-gray-200 p-4 rounded-md">
              <h2 className="text-2xl font-semibold mb-4 text-center">Your Order</h2>
              <div className="bg-white p-5 mb-5">
			  	<div className="flex justify-between mb-2 font-bold  p-2">
					<span>PRODUCT</span>
					<span>SUBTOTAL</span>
				</div>

					<>
						
							{items?.map((item) => (
								<div className="flex justify-between mb-2 border border-dashed border-gray-400 p-2">
									<div className="flex flex-col">
										<span>{item.title}</span>
										<small>{item.variant}  ({item.quantity} x ₹{item.price})</small>
									</div>

									<span className="text-red-600 font-bold text-lg">₹{item.itemTotal}</span>
								</div>
							))}
						
					</>
				

				<div className="border border-dashed border-gray-400 p-2">
					<div className="flex justify-around m-2 text-black font-semibold">
						<span>Subtotal</span>
						<span>₹{total}</span>
					</div>
					<div className="flex justify-around m-2 text-black font-semibold">
						<span>Shipping</span>
						<span>₹150.00</span> {/* Adjust as needed */}
					</div>
				</div>





				<div className="flex justify-between mt-4 mb-4 text-lg font-semibold">
					<span>Total:</span>
					<span className="text-red-600 font-bold text-lg">₹	{total+150}</span>
				</div>
			  </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method:</label>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="paymentMethod1"
                    onChange={() => setPaymentMethod("razorpay")}
                    value="razorpay"
                    className="mr-2"
                    checked={paymentMethod === 'razorpay'}
                  />
                  <label htmlFor="paymentMethod1">Credit Card/Debit Card/NetBanking --- Razorpay</label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    id="paymentMethod2"
                    onChange={() => setPaymentMethod("ccavenue")}
                    value="ccavenue"
                    className="mr-2"
                    checked={paymentMethod === 'ccavenue'}
                  />
                  <label htmlFor="paymentMethod2">NetBanking</label>
                </div>
              </div>
			        <div className="border-t border-gray-300 py-2 px-4 my-4">
                <p className="text-gray-700 text-sm">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
              </div>
                  <div className="flex items-center">
                      <input
                        defaultChecked={isTerm == true ? "true" : "false"}
                        type="checkbox"
                        id="isTerm"
                        {...register('isTerm')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isTerm" className="ml-2 block text-sm text-gray-900">
                          I have read and agree to the website terms and conditions *
                      </label>
                    </div>
                    <div className='mt-5'>
                      {/* <button
                        type="submit"
                        className="bg-black hover:bg-gray-900 text-white font-semibold py-1 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Place Order
                      </button> */}
                      {
                        status == "authenticated" ?
                          <Button
                            type="submit"
                            loading={isAddressLoading || isOrderLoading}
                            disabled={isAddressLoading || isOrderLoading}
                            className="h-11 md:h-12 w-full mt-1.5"
                          >
                            Place Order
                          </Button>
                      :
                          <Button
                            type="button"
                            loading={isAddressLoading}
                            disabled={isAddressLoading}
                            className="h-11 md:h-12 w-full mt-1.5"
                            onClick={() => router.push("login")}
                          >
                            Place Order
                        </Button>
                      }

                    </div>
                  </div>
                </div>
              </div>

        </form>
      </div>
    </div>
  );
}

CheckoutPage.Layout = Layout;



export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
