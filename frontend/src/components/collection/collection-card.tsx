import cn from "classnames";
import Image from "next/image";
import type { FC } from "react";
import { Collection } from "@framework/my_types";
import { useRouter } from 'next/router';

interface CollectionProps {
	collection: Collection;
	className?: string;
	contactClassName?: string;
	imageContentClassName?: string;
	variant?: "grid" | "gridSlim" | "list" | "listSmall";
	imgWidth?: number | string;
	imgHeight?: number | string;
	imgLoading?: "eager" | "lazy";
}

const CollectionCard: FC<CollectionProps> = ({
	collection,
	className = "",
	contactClassName = "",
	imageContentClassName = "",
	variant = "list",
	imgWidth = 340,
	imgHeight = 480,
	imgLoading,
}) => {
	const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
	const router = useRouter();
	

	function handlePopupView(collection: Collection) {
		router.push(`/collections/${collection?.slug}`);
	}


	console.log(collection)


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
			onClick={() =>  handlePopupView(collection)}
			role="button"
			title={"sd"}
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
					src={collection.image?.src?.toString() ?? placeholderImage}
					width={200}
					height={200}
					loading={imgLoading}
					quality={100}
					alt={collection?.title}
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
					{collection?.title}
				</h2>				
			</div>
		</div>
	);
};

export default CollectionCard;
