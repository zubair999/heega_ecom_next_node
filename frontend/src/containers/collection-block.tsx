import CollectionCard from "@components/common/collection-card";
import { Collection } from "@framework/my_types";


interface Props {
	collections: any;
	className?: string;
	variant?: "default" | "modern";
	loading: boolean;
	error?: string;
	uniqueKey?: string;
}

const CollectionBlock: React.FC<Props> = ({
	collections,
	loading,
	error,
	className = "mb-12 md:mb-14 xl:mb-16 lg:pt-1 xl:pt-0",
	variant = "default",
	uniqueKey,
}) => {
	const isEven = (value: number) => {
		return value % 2;
	};
	return (
		<div
			className={`${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 xl:gap-1`}
		>
			{collections?.map((item: any, index: any) => (
				<CollectionCard
					key={item._id}
					collection={item}
					variant={variant}
					contactClassName={
						isEven(index + 1) == 0 && variant !== "modern"
							? "sm:pb-4 md:pb-5 lg:pb-4 2xl:pb-5 3xl:pb-6 pt-3.5 sm:pt-0.5 lg:pt-1 px-4 sm:px-0"
							: "pt-3.5 lg:pt-4 xl:pt-5 3xl:pt-7 px-4 sm:px-0"
					}
				/>
			))}
		</div>
	);
};

export default CollectionBlock;
