import BannerMiddleCard from "@components/common/banner-middle-card";
import Container from "@components/ui/container";
import BannerCarouselBlock from "@containers/banner-carousel-block";
import SocialReviewBlock from "@containers/social-review-block";
import Divider from "@components/ui/divider";
import HeroBlock from "@containers/hero-block";
import Layout from "@components/layout/layout";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import BestSellerCollectionFeed from "@components/collection/best-seller-collection-feed";
import { homeOneBanner as banner } from "@framework/static/banner";
import { promotionBannerTwo as promotionBanners } from "@framework/static/banner";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import {
	IoLogoInstagram,
} from "react-icons/io5";

export default function Home() {
	

	
	return (
		<>
			<HeroBlock />
			<Container>
				<BestSellerProductFeed />
				<Divider />
				<BestSellerCollectionFeed />
				<BannerCarouselBlock bannerData={promotionBanners} sectionHeading="text-protective-gear"/>
				<BannerMiddleCard
					key={`banner--key${banner.id}`}
					banner={banner}
					href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
					className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
					classNameInner="h-28 sm:h-auto"
				/>
				<SocialReviewBlock sectionHeading="text-social-reviews" />
				<div className="flex flex-col items-center justify-center">
					<a target="_blank" href="https://www.instagram.com/heegasportsofficial" className="text-white bg-[#050708] hover:bg-[#050708]/80  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
						<IoLogoInstagram size={30} />
						<span className="ml-1">Follow Us</span>
					</a>
				</div>
			</Container>
		</>
	);
}



Home.Layout = Layout;
export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const queryClient = new QueryClient();

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer"
			])),
		},
		revalidate: 60,
	};
};
