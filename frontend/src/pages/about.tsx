import Layout from "@components/layout/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";



export default function AboutPage() {
	const { t } = useTranslation("privacy");

	
	return (
		<>
			<div className="mt-12 lg:mt-14 xl:mt-16 lg:py-1 xl:py-0 border-b border-gray-300 px-4 md:px-10 lg:px-7 xl:px-16 2xl:px-24 3xl:px-32 pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24">
				<section className="relative">
					<div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20">
						<svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
							<polygon className="text-white fill-current" points="2560 0 2560 100 0 100">
						</polygon></svg>
					</div>
					<div className="container mx-auto ">
						<div className="items-center flex flex-wrap">
							<div className="flex justify-center w-full md:w-4/12 ml-auto mb-auto mr-auto px-0">
								<img alt="..." className="max-w-full rounded-lg shadow-lg" src="https://heegasports.com/wp-content/uploads/elementor/thumbs/xzgfg-pk8sivsd4mg19o3dnq2xe5rspcjnwtkskwiav2l8q8.jpg"/>
							</div>

							<div className="w-full md:w-5/12 ml-auto mr-auto mt-6">
								<div className="md:pr-12">
									<h3 className="text-3xl font-semibold">A little about Heegasports</h3>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
									This is not just a website but a platform where you can buy extraordinary sports equipment in many varieties at a very suitable price without compromising the quality of the product. Heega Sports Private Limited entered the market with great hard work and dedication to launch their registered Trademark ‘Heega’ in the year 2015. In a very short time since its inception, Heegasports.com has taken a significant position in the sports industry in India. We manufacture quality sports equipment to meet the requirements of national and international markets.
									</p>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
									Heega Sports Private Limited as the manufacturer & exporter of quality Sporting goods being exported to several countries around the globe like Australia, UK, USA, South Africa, Canada, Sri Lanka, etc, and offers guaranteed time-definite and day-definite delivery worldwide.
									</p>
									<p className="about_p mt-4 text-lg leading-relaxed text-blueGray-500">
									We are one of the best cricket bat manufacturers in Meerut.
									</p>
									<ul className="list-none mt-6">
										<li className="py-2">
											<div className="flex items-center">
												<div>
													<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
														<i className="fas fa-fingerprint"></i>
													</span>
												</div>
												<div>
													<h4 className="text-blueGray-500">Carefully Handcrafted Bats</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center">
												<div>
													<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
														<i className="fab fa-html5"></i>
													</span>
												</div>
												<div>
													<h4 className="text-blueGray-500">Redefine Design & Innovations</h4>
												</div>
											</div>
										</li>
										<li className="py-2">
											<div className="flex items-center"><div>
												<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
													<i className="far fa-paper-plane"></i>	
												</span>
											</div>
												<div>
													<h4 className="text-blueGray-500">Authentic Materials</h4>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>					
					</div>



					


					


				</section>
			</div>
		</>
	);
}

AboutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"privacy",
				"footer",
			])),
		},
	};
};
