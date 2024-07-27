import { useState, useMemo, useEffect } from "react";
import Button from "@components/ui/button";
import { useRouter } from "next/router";
import { useCart } from "@contexts/cart/cart.context";
import cn from "classnames";
import { useWindowSize } from "@utils/use-window-size";
import Carousel from "@components/ui/carousel/carousel";
import ProductMetaReview from "@components/product/product-meta-review";
import { useSingleProductQuery } from "@framework/product/get-product";
import { useUI } from "@contexts/ui.context";
import { NProduct } from "@framework/product_types";
import { Item, getItem } from "@contexts/cart/cart.utils";
import usePrice from "@framework/product/use-price";
import Breadcrumb from "@components/common/breadcrumb";
import ActiveLink from "@components/ui/active-link";





const productGalleryCarouselResponsive = {
	"768": {
		slidesPerView: 2,
	},
	"0": {
		slidesPerView: 1,
	},
};

const ProductSingleDetails: React.FC = () => {
	const router = useRouter()
	const { pathname, query } = router;
	const { openCart } = useUI();
	
	const productId = query.slug != undefined ? query.slug[1] :"";
	const query1 = `handle=${productId}`;

	console.log(query1)

	const { data, isLoading, error } = useSingleProductQuery(query1);
	const variant = query?.variant ? query?.variant as string : ""
	const { width } = useWindowSize();
	const { addItemToCart } = useCart();
	const [isSelected, setIsSelected] = useState(true);
	const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
	const { setModalView, openModal, closeModal } = useUI();


	function findVariantt(variant: string | null | undefined, data: NProduct | null | undefined): any {
		if (typeof variant == "string" && variant.length > 0) {
			const v = parseInt(variant);
			const selectedVariant = data?.variants?.find(variant => variant.id === v);
			return selectedVariant ? selectedVariant : {};
		} else {
			return data?.variants?.[0] || {};
		}
	}

	const variant_optiont = useMemo(() => findVariantt(variant, data), [variant, data]);

	const { price, basePrice, discount } = usePrice({
		amount: variant_optiont?.price,
		baseAmount: variant_optiont?.compare_at_price,
		currencyCode: "INR",
	});


	if (isLoading) return <p>Loading...</p>;

	if(error) return <p>{error.message}</p>


	function itemMatches(item: any, parts: any) {
		const itemOptions = item.option.map((opt: string) => opt.toLowerCase());
		for (let part of parts) {
			if (itemOptions.includes(part)) {
				return true;
			}
		}
		return false;
	}


	function changeOption (option: string) {
		const h = data?.variants?.filter(variant => variant?.option?.includes(option));

		let parts;
		let mystring: string | undefined;
		if(variant_optiont?.option?.length == 0){
			mystring = data?.variants[0].option.join(",");
			parts = mystring?.toLowerCase().split(/[, ]+/);
		} else {
			mystring = variant_optiont?.option.join(",")
			parts = mystring?.toLowerCase().split(/[, ]+/);
		}

		const match = h?.find(item => itemMatches(item, parts));

		const currentUrl = router.asPath;
		function removeQueryString(url: string): string {
			const queryStringIndex = url.indexOf('?');
			if (queryStringIndex !== -1) {
				return url.substring(0, queryStringIndex);
			}
			return url;
		}

		if (match) {
			router.push({
				pathname: removeQueryString(currentUrl),
				query: { variant: match.id },
			  });
		} else {
			console.log("No matching variant found.");
		}
	}

	function addToCartHandler(){
		if (!isSelected) return;

		

		const variantIdToFind = query.variant ? parseInt(query.variant as string) : 0;
		let selectedVariant;

		if (variantIdToFind === 0) {
			selectedVariant = data?.variants?.[0];
		} else {
			selectedVariant = data?.variants?.find(variant => variant.id === variantIdToFind);
		}



		const itemTitle = data?.title == undefined ? "" : data?.title
		const itemImg = data?.image?.src == undefined ? "" : data?.image?.src
		const itemId = selectedVariant?.id == undefined ? 0 : selectedVariant?.id
		const variant = selectedVariant?.title == undefined ? "" : selectedVariant?.title
		const itemPrice = selectedVariant?.price == undefined ? 0 : selectedVariant?.price
		const itemQty = selectedVariant?.inventory_quantity == undefined ? 0 : selectedVariant?.inventory_quantity


		const item: Item = {
			id: itemId,
			title: itemTitle,
			variant: variant,
			price: itemPrice,
			image: itemImg,
			quantity: itemQty,
			key: itemId
		}

		addItemToCart(item, 1)
		openCart()
	}

	function removeQueryString(url: string): string {
		const queryStringIndex = url.indexOf('?');
		if (queryStringIndex !== -1) {
			return url.substring(0, queryStringIndex);
		}
		return url;
	}

	function useGetCat(data: any) {
			const pathh = data?.map((path : any, i: number) => {
			return {
				breadcrumb: path,
				href: "/collections/" + path
			};
		})
		return pathh;
	}

	function GetCat() {
		const dataa = data?.collection ? data.collection : []
		const my_cr = [ "kashmir-willow-bats", "i-hate-losing-willow-cricket-bat" ];
		const catt = useGetCat(dataa)

		return (
			<>
				{catt?.map((item: any, i: number) => (
					<ActiveLink
						href={item.href}
						activeClassName="font-semibold text-heading"
						key={item.href}
					>
						<a className="capitalize">
							{convertBreadcrumbTitlee(item.breadcrumb)}{i !== catt.length - 1 ? ", " : ""} 
						</a>
					</ActiveLink>
				))}
			</>
		)
	}

	function convertBreadcrumbTitlee(string: string) {
		return string
			.replace(/-/g, " ")
			.replace(/oe/g, "ö")
			.replace(/ae/g, "ä")
			.replace(/ue/g, "ü")
			.toLowerCase();
	}


	const metaData = [
		{
		  "id": 1,
		  "title": "Product Details",
		  "content": `<ul className="list-disc list-inside important">
        <li className="mb-2">Pre knocked 8000 times with machine to give explosive power to the bat.</li>
        <li className="mb-2">It is a grade 2 bat and comes in sizes 5, 6, Harrow, SH and LH.</li>
        <li className="mb-2">Tough and well built bat, weight around 1 to 1.2 Kg made of good Kashmir willow.</li>
        <li className="mb-2">Durable and long lasting to give better execution.</li>
        <li className="mb-2">Singaporean cane handle with quality grade wood for shock absorption.</li>
        <li className="mb-2">With non toxic reverse wave grip for better grip.</li>
        <li className="mb-2">Edges of 40mm thickness and a curved blade that improve your strokes.</li>
        <li className="mb-2">Bat toe of semi oval shape gives you suitable position.</li>
        <li className="mb-2">Designed to be played with leather and tennis ball for players aging 11 years old and above.</li>
        <li className="mb-2">Bat comes with a bat cover to keep it safe from dust and water splash.</li>
      </ul>`
		},
		{
		  "id": 2,
		  "title": "Additional Information",
		  "content": "This is product additional information 1"
		}
	]


	const showSizeChart = () => {
		console.log("show chart")
		setModalView("SIZE_CHART");
		return openModal();
	}

	return (
		<div className="block lg:grid grid-cols-8 gap-x-10 xl:gap-x-14 pt-14 pb-10 lg:pb-14 2xl:pb-20 items-start">
			{width < 1025 ? (
				<Carousel
					pagination={{
						clickable: true,
					}}
					breakpoints={productGalleryCarouselResponsive}
					className="product-gallery"
					buttonGroupClassName="hidden"
				>
				</Carousel>
			) : (
				<div className="col-span-4 grid grid-cols-2 gap-2.5">
					{data?.images.map((item, index: number) => (
						<div
							key={index}
							className="col-span-1 transition duration-150 ease-in hover:opacity-90"
						>
							<img
								src={
									item?.src ??
									"/assets/placeholder/products/product-gallery.svg"
								}
								className="object-cover w-full"
							/>
						</div>
					))}
				</div>
			)}

			<div className="col-span-3 pt-8 lg:pt-0">
				<div className="pb-7 border-b border-gray-300 mb-3">
					<Breadcrumb />
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{data?.title}
					</h2>
					<div className="flex items-center mt-5">
						<div className="text-heading  text-base md:text-xl lg:text-xl 2xl:text-2xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							{price}
						</div>
						<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
							{basePrice}
						</span>
					</div>
				</div>

				<div className="tracking-[0.35em] uppercase my-6 text-sm text-black flex cursor-pointer hover:underline" onClick={showSizeChart}>
					<span>Size Chart</span>
					<span className="ml-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlSpace="preserve"
							width={15}
							height={15}
							viewBox="0 0 32 32"
						>
							<g fill="#000">
								<path d="M25.492 1.171c-.609-.61-1.674-.61-2.283 0l-3.557 3.557L4.269 20.111a.492.492 0 0 0-.118.186L.331 31.03a.5.5 0 0 0 .639.639l10.733-3.82.011-.008a.488.488 0 0 0 .175-.111L27.05 12.57l.044-.044.178-.178 3.557-3.557c.305-.305.473-.71.473-1.142s-.168-.837-.473-1.142l-5.337-5.336zM11.447 26.759c-3.785-1.995-5.525-4.771-6.099-5.899-.056-.11-.099-.2-.136-.279L20.005 5.788l6.207 6.207-14.765 14.764zm-6.751-5.01c.746 1.31 2.43 3.676 5.613 5.535l-8.683 3.09 3.07-8.625zM30.122 8.084l-3.203 3.204-6.206-6.206 3.204-3.203a.63.63 0 0 1 .869 0l5.337 5.337a.612.612 0 0 1-.001.868z" />
								<path d="M20.653 8.504a.5.5 0 0 0-.707 0l-12.22 12.22a.5.5 0 0 0 .708.707l12.22-12.22a.501.501 0 0 0-.001-.707zM23.7 11.15a.5.5 0 0 0-.707 0L10.576 23.567a.5.5 0 0 0 .708.707L23.7 11.857a.499.499 0 0 0 0-.707zM7.607.447a1.527 1.527 0 0 0-2.16 0l-5 5a1.528 1.528 0 0 0 0 2.16l6.66 6.66a.498.498 0 0 0 .708 0 .5.5 0 0 0 0-.707L6.11 11.855 9.285 8.68a.5.5 0 0 0-.707-.707l-3.175 3.175-1.717-1.716 1.757-1.758a.5.5 0 0 0-.707-.707L2.979 8.725 1.154 6.9a.528.528 0 0 1 0-.746l5-5a.53.53 0 0 1 .746 0l6.661 6.661a.5.5 0 0 0 .707-.707L7.607.447zM24.893 17.733a.5.5 0 0 0-.707.707l6.66 6.66a.528.528 0 0 1 0 .746l-5 5a.528.528 0 0 1-.746 0l-1.637-1.637 3.175-3.175a.5.5 0 0 0-.707-.707l-3.175 3.175-1.716-1.716 1.758-1.758a.5.5 0 0 0-.707-.707l-1.758 1.758-1.893-1.893a.5.5 0 0 0-.707.707l6.66 6.66c.298.298.689.447 1.08.447.391 0 .782-.149 1.08-.447l5-5a1.528 1.528 0 0 0 0-2.16l-6.66-6.66z" />
							</g>
						</svg>
					</span>
				</div>


				<div className="pb-1">
					{
						data?.options.map((item, index) => {
							return (
								<div key={index} className="mb-4">
										
										<h3 className="text-base text-heading mb-2.5 uppercase tracking-[2px]">
											{item.name}
										</h3>
										<ul className="colors flex flex-wrap -me-3">
											{
											item.filter_option?.map((item1, index1) => {
												return (
													<li
														key={index1}
															className={cn("", "cursor-pointer border border-gray-100 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-xs uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
															{
																"border-black": variant_optiont?.option?.length == 0 && index1 == 0 ? true : variant_optiont?.option?.includes(item1),
															}
														)  }
														onClick={() => changeOption(item1)}
													>
														{item1}
													</li>
												)
											})
											}
										</ul>
										
								</div>
							)
						})
					}
				</div>


				<div className="text-black text-lg">
					Note: 
					<span className="text-red-500 text-base font-medium tracking-widest"> It can take upto 7 working days for the bat to be dispatched.</span>
				</div>

				<div className="flex items-center space-s-4    py-3">
					<Button
						onClick={addToCartHandler}
						variant="slim"
						className={`w-full md:w-6/12 xl:w-full border border-black ${!isSelected && ""}`}
						disabled={!isSelected}
						loading={addToCartLoader}
					>
						<span className="py-2 3xl:px-8 uppercase tracking-[.45em] text-black">Add to cart</span>
					</Button>
				</div>
				<p className="text-gray  text-sm text-justify my-3">
					{
						data?.body_html
					}
				</p>

				<div className="my-10">
					<ul className="text-sm space-y-3 pb-1">
						<li>
							<span className="font-semibold text-heading inline-block pe-2">
								SKU:
							</span>
							{variant_optiont?.sku ? variant_optiont?.sku : "NA"}
						</li>
						<li>
							<span className="font-semibold text-heading inline-block pe-2">
								Category:
							</span>
							{
								data?.collection ? <GetCat /> : "NA"
							}

						</li>
					</ul>
				</div>
				
				

				<ProductMetaReview data = {metaData}/>
			</div>
		</div>
	);
};

export default ProductSingleDetails;
