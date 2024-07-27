import { PriceFilter } from "./price-filter";
import { AllFilter } from "./all-filters";
import { useAllFilterQuery } from "@framework/collection/all-filter";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";



export const ShopFilters: React.FC = () => {
	const router = useRouter();
	const { query } = router;


	const { data, isLoading, error } = useAllFilterQuery({
		limit: 10,
		cid: query.collection as string
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	const items = data;


	return (
		<>
			<div className="pt-1">
				<PriceFilter />
				{
					items?.map((item: any, index: number) => {
						return (
							<AllFilter 
								key={index.toString()}
								filter_name={item.filter_name}
								options={item.filter_option}
								filter_key={item.filter_key}
							/>
						)
					})
				}
			</div>
		</>
	);
};
