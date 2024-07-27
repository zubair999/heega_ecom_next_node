import { NProduct } from "@framework/product_types";
import BannerCard from "@components/common/banner-card";
import BannerMiddleCard from "@components/common/banner-middle-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@utils/routes";
import SectionHeader from "@components/common/section-header";
import { useFlashSaleProductsQuery } from "@framework/product/get-product";



const breakpoints = {
	"1025": {
		slidesPerView: 3,
		spaceBetween: 28,
	},
	"480": {
		slidesPerView: 2,
		spaceBetween: 20,
	},
	"0": {
		slidesPerView: 1,
		spaceBetween: 12,
	},
};

interface BannerProps {
	className?: string;
	bannerData: any;
	sectionHeading: string
}

const BannerCarouselBlock: React.FC<BannerProps> = ({
	className = "mb-12 md:mb-12 lg:mb-14 pb-0.5 xl:pb-1.5",
	bannerData,
	sectionHeading
}) => {

	// const { data, isLoading, error } = useFlashSaleProductsQuery({
	// 	limit: 10
	// });






	return (
		<div className={className}>
			<SectionHeader sectionHeading={sectionHeading} />
			<Carousel breakpoints={breakpoints} autoplay={{ delay: 5000 }}>
				{bannerData?.map((banner: any) => (
					<SwiperSlide key={`promotion-banner-key-${banner?.id}`}>
						<BannerMiddleCard
							banner={banner}
							href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
							effectActive={true}
						/>
					</SwiperSlide>
				))}
			</Carousel>
		</div>
	);
};

export default BannerCarouselBlock;
