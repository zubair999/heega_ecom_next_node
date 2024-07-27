import CollectionCard from "@components/collection/collection-card";
import type { FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
// import { useTranslation } from "next-i18next";
import { Collection } from "@framework/my_types";
import { useCollectionsQuery } from "@framework/collection/get-all-collection";
import { useRouter } from "next/router";





interface CollectionGridProps {
	className?: string;
}

function replaceSlugWithCollection(inputObject: Record<string, any>): Record<string, any> {
    // Destructure the input object to extract 'slug' and the rest of the properties
    const { slug, ...rest } = inputObject;

    // Create a new object with 'collection' instead of 'slug' and spread the rest of the properties
    const updatedObject = {
        collection: slug,
        ...rest
    };

    return updatedObject;
}






export const CollectionGrid: FC<CollectionGridProps> = ({ className = "" }) => {
	const router = useRouter();
	const { pathname, query } = router;
	const updatedObject = replaceSlugWithCollection(query);

	function getCollectionQuery(inputObject: Record<string, any>) {
		const  slug  = updatedObject.collection != undefined ? updatedObject.collection : ""
		const query = `collections`
		return query;
	}
	
	const query1 = getCollectionQuery(query)
	const { data, isLoading, error } = useCollectionsQuery(query1);


	console.log("-----------------")
	console.log(data);


	if(isLoading) return <div className={`grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}>
		<ProductFeedLoader limit={20} uniqueKey="search-product" />
	</div>

	if(error) return <p>{error.message}</p>

	return (
		<>
			<div
				className={`grid grid-cols-2 sm:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
			>
				{
					data?.map((collection: Collection) => {
						return (
							<CollectionCard
								key={`product--key${collection._id}`}
								collection={collection}
								variant="listSmall"
								imgLoading="lazy"
							/>
						)
					})
				}
			</div>
		</>
	);
};
