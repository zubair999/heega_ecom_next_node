import ProductsBlock from "@containers/products-block";
import { useBestSellerProductsQuery } from "@framework/product/get-all-best-seller-products";

export default function BestSellerCollectionnFeed() {
	const { data, isLoading, error } = useBestSellerProductsQuery({
		limit: 10,
	});

	return (
		<ProductsBlock
			sectionHeading="text-top-sellers"
			products={data}
			loading={isLoading}
			error={error?.message}
			uniqueKey="best-sellers"
		/>
	);
}
