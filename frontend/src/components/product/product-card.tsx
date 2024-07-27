import cn from "classnames";
import Image from "next/image";
import type { FC } from "react";
import { useUI } from "@contexts/ui.context";
import usePrice from "@framework/product/use-price";
import { NProduct } from "@framework/product_types";
import { useRouter } from 'next/router';

interface ProductProps {
	product: NProduct;
	className?: string;
	contactClassName?: string;
	imageContentClassName?: string;
	variant?: "grid" | "gridSlim" | "list" | "listSmall";
	imgWidth?: number | string;
	imgHeight?: number | string;
	imgLoading?: "eager" | "lazy";
	collectionSlug: string
}

const ProductCard: FC<ProductProps> = ({
	product,
	className = "",
	contactClassName = "",
	imageContentClassName = "",
	variant = "list",
	imgWidth = 340,
	imgHeight = 480,
	imgLoading,
	collectionSlug
}) => {
	const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;

	const router = useRouter();
	const currentUrl = router.asPath;

	function handlePopupView() {
		const nextSegment = 'new';
		const nextUrl = `${router.query.collection}/${product.handle}`;

		console.log(nextUrl)
		window.open(nextUrl, "_self");
	}

	return (
		<div
			className={cn(
				"group box-border overflow-hidden flex rounded-md cursor-pointer",
				{
					"pe-0 pb-2 lg:pb-3 flex-col items-start bg-white ":
						variant === "grid",
					"pe-0 md:pb-1 flex-col items-start bg-white": variant === "gridSlim",
					"items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
						variant === "listSmall",
					"flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4":
						variant === "list",
				},
				className
			)}
			onClick={handlePopupView}
			role="button"
			title={product?.title}
		>
			<div
				className={cn(
					"flex",
					{
						" ": variant === "grid",
						" pb-0": variant === "gridSlim",
						"flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
							variant === "listSmall",
					},
					imageContentClassName
				)}
			>
				<Image
					src={product.image.src == "" || product.image.src == null ? placeholderImage  : product.image.src}
					width={imgWidth}
					height={imgHeight}
					loading={imgLoading}
					quality={100}
					alt={product?.title || "Product Image"}
					className={cn("bg-gray-300 object-cover rounded-s-md", {
						"w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
							variant === "grid",
						"rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
							variant === "gridSlim",
						"rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
							variant === "list",
					})}
				/>				
			</div>
			<div
				className={cn(
					"w-full overflow-hidden",
					{
						"md:px-2.5 xl:px-4": variant === "grid",
						"ps-0": variant === "gridSlim",
						"px-4 lg:px-5 2xl:px-4": variant === "listSmall",
					},
					contactClassName
				)}
			>
				<h2
					className={cn("text-heading font-semibold mb-1 text-center ", {
						"text-sm md:text-xl": variant === "grid",
						"md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
							variant === "gridSlim",
						"text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
						"text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
							variant === "list",
					})}
				>
					{product?.title}
				</h2>
				<div
					className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 text-center ${
						variant === "grid"
							? "lg:text-lg lg:mt-2.5"
							: "sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3"
					}`}
				>
					
					<del className=" font-normal text-gray-800 text-sm">
						₹8925.36
					</del>
					<span className="inline-block sm:text-base text-red-800">₹6235.62</span>
					<span className="inline-block text-sm">89% Off</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
