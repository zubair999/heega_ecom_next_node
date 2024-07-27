import Scrollbar from "@components/common/scrollbar";
import { useCart } from "@contexts/cart/cart.context";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

export default function Cart() {
	const { t } = useTranslation("common");
	const { closeCart } = useUI();
	const { items, total, isEmpty } = useCart();
	const { price: cartTotal } = usePrice({
		amount: total,
		currencyCode: "USD",
	});

	const router = useRouter();

  const handleCheckoutClick = () => {
    router.push('/checkout');
  };

	

	return (
		<motion.div 
			initial={{ opacity: 0, y: 50 }} // initial animation state
			animate={{ opacity: 1, y: 0 }}   // animate to this state
			transition={{ duration: 0.5, delay: 0.35 }}   // animation duration
			className="flex flex-col w-full h-full justify-between"
		>
			<div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
				<h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
					{/* {t("text-shopping-cart")} */}
					Cart
				</h2>
				<button
					className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
					onClick={closeCart}
					aria-label="close"
				>
					<IoClose className="text-black mt-1 md:mt-0.5" />
				</button>
			</div>
			{items.length > 0 ? (
				<Scrollbar className="cart-scrollbar w-full flex-grow">
					<div className="w-full px-5 md:px-7">
						{items?.map((item) => (
							<CartItem item={item} key={item.id} />
						))}
					</div>
				</Scrollbar>
			) : (
				<motion.div
					layout
					initial="from"
					animate="to"
					exit="from"
					variants={fadeInOut(0.25)}
					className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
				>
					<EmptyCart />
					<h3 className="text-lg text-heading font-bold pt-8">
						{/* {t("text-empty-cart")} */}
						Cart is empty!
					</h3>
				</motion.div>
			)}

			<div
				className="flex flex-col px-5 md:px-7 pt-2 pb-5 md:pb-7"
				onClick={closeCart}
			>
				{/* <Link
					href={"/address"}
					className={cn(
						"w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600",
						{
							"cursor-not-allowed bg-gray-400 hover:bg-gray-400": 0 == 0 ,
						}
					)}
				>
					<span className="w-full pe-5 -mt-0.5 py-0.5">
						{t("text-proceed-to-checkout")}
					</span>
					<span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
						<span className="border-s border-white pe-5 py-0.5" />
						₹{Math.abs(CART.totalAmount).toFixed(2)}
						₹56565.3

					</span>
				</Link> */}
				{/* Subtotal */}


					
						{
							items.length > 0 ?
							
							<div className="mb-5">
								<div className="flex justify-between">
									<div className="font-semibold">Subtotal</div>
									<div><span className="font-semibold">₹{total}</span></div>
								</div>

								<div className="text-center mt-4 mb-2">
									<small className="text-lg text-gray-600">
										Shipping, taxes, and discount codes calculated at checkout.
									</small>
								</div>
								<button 
									onClick={handleCheckoutClick}
									className="simpl-button-v3-variables simpl-button-v3 simpl-button w-full py-3 bg-black text-white font-semibold uppercase"		
								>
									<div className="">
										UPI / Pay-in-3 / COD
									</div>
								</button>
								<div style={{ display: 'none' }}></div>

							</div>
							:
							null
						}
			
			
			</div>


		</motion.div>
	);
}






  
