import ProductCard from "@components/product/product-card";
import type { FC } from "react";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";
// import { useTranslation } from "next-i18next";
import { NProduct } from "@framework/product_types";
import { useProductQuery } from "@framework/product/get-product";
import { useRouter } from "next/router";
import qs from "qs";



interface FilterOption {
	filter_option: string[];
  }
  
  interface QueryObject {
	collection: string;
	$and: FilterOption[];
  }
  


interface ProductGridProps {
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






export const ProductGrid: FC<ProductGridProps> = ({ className = "" }) => {
	const router = useRouter();
	const { pathname, query } = router;
	const updatedObject = replaceSlugWithCollection(query);


	// Define types/interfaces for better type safety and clarity
// interface FilterOption {
// 	filter_option: string[];
//   }
  
//   interface QueryObject {
// 	collection: string;
// 	$and?: FilterOption[]; // Make $and optional
//   }
  
  // Define types/interfaces for better type safety and clarity
  interface OriginalObject {
    [key: string]: string; // Assuming all keys are strings with string values
}

interface ConvertedObject {
    collection: string;
    $and: {
        [key: string]: {
            $in: string[];
        };
    }[];
}

function convertToObject(original: OriginalObject): ConvertedObject {
    // Extract the 'collection' property from the original object
    const { page, collection, ...filteredObject } = original;

    // Convert the remaining properties into $and array
    const $andArray = Object.entries(filteredObject).map(([key, value]) => {
        return {
            [`options.filter_option`]: { $in: value.split(',') }
        };
    });

    const convertedObject: ConvertedObject = {
        collection,
        $and: $andArray
    };

    return convertedObject;
}

// Example usage:
const myq_object1: OriginalObject = {
    page: '1',
    size: '5-no-30.5-inch,dual-blade-36-inch',
    color: 'red',
    collection: 'kashmir-willow-bats'
};

// const convertedObject = convertToObject(myq_object1);
// console.log(convertedObject);

	  
	  

	function getProductQuery(inputObject: Record<string, any>) {
		const queryy:any = router.query;
		// queryy.page = 1;


		const myq = {
			collection: "kashmir-willow-bats",
			$and: [
			  {
				"options.filter_option": {
				  $in: [
					"5-no-30.5-inch"
				  ]
				}
			  }
			]
		  }

		//   queryy.page = 1
		
		//   const tyyyt:any = convertToJsonData(queryy)
		let tyyyt:any
		  try {
			tyyyt = convertToObject(queryy);
			console.log(tyyyt);
		  
			// const result2 = convertToJsonData(myq_object2);
			// console.log(result2);
		  } catch (error) {
			console.error('Error:', error);
		  }

		  tyyyt.page = 1


		  const stringifiedQuery1 = qs.stringify(tyyyt, { skipNulls: true });
		


		const stringifiedQuery = qs.stringify(myq, { skipNulls: true });

		

		console.log("---------------------0000000000000000000")
		console.log(queryy)
		console.log(tyyyt)
		console.log(stringifiedQuery1)




		
		return stringifiedQuery1;
	}


	
	const query1 = getProductQuery(query)
	const { data, isLoading, error } = useProductQuery(query1);


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
					data?.map((product: NProduct) => {
						return (
							<ProductCard
								key={`product--key${product._id}`}
								product={product}
								variant="grid"
								imgLoading="lazy"
								collectionSlug={query1}
							/>
						)
					})
				}
			</div>
		</>
	);
};
