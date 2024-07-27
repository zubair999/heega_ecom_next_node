import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import { ProductGrid } from "@components/product/product-grid";
import SearchTopBar from "@components/shop/top-bar";
import { useTranslation } from "next-i18next";
import Breadcrumb from "@components/common/breadcrumb";


export default function Shop() {
	const { t } = useTranslation("common");

	return (
		<>
			<Container>
				<div className="pt-14 pb-4 flex justify-center">
					<Breadcrumb />
				</div>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="flex-shrink-0 pe-24 hidden lg:block w-96">
						<StickyBox offsetTop={50} offsetBottom={20}>
							<ShopFilters />
						</StickyBox>
					</div>

					<div className="w-full lg:-ms-9">
						<SearchTopBar />
						<ProductGrid />
					</div>
				</div>
			</Container>
		</>
	);
}

Shop.Layout = Layout;




// export const getStaticProps: GetStaticProps = async ({  locale }) => {

// 	console.log("params-----------------------------------")
// 	// console.log(params)

// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale!, [
// 				"common",
// 				"forms",
// 				"menu",
// 				"footer",
// 			])),
// 		},
// 	};
// };


// export async function getStaticPaths() {

	

// 	return {
// 	  paths: [
// 		{ params: { slug: 'english-willow-bats' }, locale: 'en' },
// 	  ],
// 	  fallback: false,
// 	};
//   }