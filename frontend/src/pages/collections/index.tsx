import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import { CollectionGrid } from "@components/collection/collection-grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

export default function Shop() {
	const { t } = useTranslation("common");

	return (
		<>
			<Container>
				<div className="pt-14 pb-4 flex justify-center">
					<a className="capitalize font-bold">All Collections</a>
				</div>
				<div className={`flex pt-8 pb-16 lg:pb-20`}>
					<div className="w-full lg:-ms-9">
						<CollectionGrid />
					</div>
				</div>
			</Container>
		</>
	);
}

Shop.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {

	const h = await serverSideTranslations(locale!, [
		"common",
		"forms",
		"menu",
		"footer",
	]);

	console.log(h);

	return {
		props: {
			...(await serverSideTranslations(locale!, [
				"common",
				"forms",
				"menu",
				"footer",
			])),
		},
	};
};
