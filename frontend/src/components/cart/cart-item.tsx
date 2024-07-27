import Link from "@components/ui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "@components/common/counter";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useCart } from "@contexts/cart/cart.context";

type CartItemProps = {
	item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { removeItemFromCart, addItemToCart } = useCart();

	const { t } = useTranslation("common");
   

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			variants={fadeInOut(1)}
			className={`group w-full h-auto flex justify-start items-start bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`}
			title={item?.name}
		>
			<div className="relative flex w-24 md:w-24 h-24 md:h-36 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
				<Image
					src={item?.image ?? "/assets/placeholder/cart-item.svg"}
					width={112}
					height={112}
					loading="eager"
					alt={item.name || "Product Image"}
					className="bg-gray-300 object-cover"
				/>
				<div
					className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
					onClick={() => removeItemFromCart(item.id)}
					role="button"
				>
					<IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
				</div>
			</div>

			<div className="flex flex-col w-full overflow-hidden">
				<Link
					href={`${ROUTES.PRODUCT}/${item?.slug}`}
					className="text-xl text-heading mb-1.5 -mt-1"
				>
					{item.title}
				</Link>
				<span>
					{item.variant}
				</span>
				<span className="text-sm text-gray-400 mb-2.5">
					{t("text-unit-price")} : ₹
					{/* {item.netPrice.toFixed(2)} */}
					{item?.price}
				</span>

				<div className="flex items-end justify-between">
					<Counter
						quantity={item.quantity}
						onIncrement={() => addItemToCart(item, 1)}
						onDecrement={() => removeItemFromCart(item.id)}
						variant="default"
					/>
					<span className="font-semibold text-sm md:text-base text-heading leading-5">
						₹{Math.abs(item.itemTotal).toFixed(2)}
					</span>
				</div>
			</div>
		</motion.div>
	);
};

export default CartItem;
