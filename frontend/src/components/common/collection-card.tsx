import Link from "@components/ui/link";
import Image from "next/image";
import Text from "@components/ui/text";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { Collection } from "@framework/my_types";


interface Props {
	imgWidth?: number | string;
	imgHeight?: number | string;
	contactClassName?: string;
	variant?: "default" | "modern";
	collection: Collection
}

const CollectionCard: React.FC<Props> = ({
	collection,
	imgWidth = 1080,
	imgHeight = 850,
	contactClassName = "",
	variant = "default",
}) => {
	const { slug, image, title, description } = collection;
	const { t } = useTranslation("common");

	return (
		<Link
			href={`/collections/${slug}`}
			className={cn(
				"group text-center flex flex-col sm:last:hidden lg:last:flex border sm:border-0 border-gray-300 overflow-hidden rounded-md pb-4 sm:pb-0",
				{
					"justify-between sm:even:flex-col-reverse": variant === "default",
				}
			)}
		>
			<div className="flex mx-auto flex-col relative">
				<div className="flex">
					<Image
						src={image?.src?.toString() ?? "/assets/placeholder/collection.svg"}
						alt={t("title") || t("text-card-thumbnail")}
						width={imgWidth}
						height={imgHeight}
						className="bg-gray-300 object-cover sm:rounded-md transition duration-200 ease-in-out group-hover:opacity-90"
					/>
				</div>
				<div className="overflow-hidden flex flex-col absolute w-full bottom-3.5 lg:bottom-16 end-3.5 lg:end-5 p-2 transform -translate-x-2/4 left-1/2 ">
					<span className="text-[26px] md:text-[40px] leading-4 text-white font-bold drop-shadow-lg">{t(`${title}`)}</span>

					<span className="w-1/4 mx-auto mt-8 border-2 border-white inline-block text-[16px] md:text-lg leading-4 cursor-pointer font-bold text-center rounded-md text-heading text-white py-2 lg:py-2 px-4 lg:px-6">
						{t("button-view-collection")}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default CollectionCard;
