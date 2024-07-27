import CollectionsBlock from "@containers/collection-block";
import { useCollectionsQuery } from "@framework/collection/get-top-collection";

export default function BestSellerCollectionFeed() {
	const { data, isLoading, error } = useCollectionsQuery({
		limit: 10,
	});

	return (
		<CollectionsBlock
			collections={data}
			loading={isLoading}
			error={error?.message}
			uniqueKey="best-sellers"
		/>
	);
}
