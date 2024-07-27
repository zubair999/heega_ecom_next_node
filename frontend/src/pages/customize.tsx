import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import CustomBatForm from "@components/common/form/custom-bat-form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function ContactUsPage() {
	const { t } = useTranslation("common");
	return (
		<>
			<Container>
				<div className="my-14 lg:my-16 xl:my-20 px-0 pb-2 lg: xl:max-w-screen-xl mx-auto flex flex-col md:flex-row w-full">
					<div className="md:w-full  flex h-full md:ms-7 flex-col lg:ps-7">
						<div className="flex pb-7 md:pb-9 mt-7 md:-mt-1.5">
							<h4 className="text-2xl 2xl:text-3xl font-bold text-heading">
								{t("text-custom-bat")}
							</h4>
						</div>
						<CustomBatForm />
					</div>
				</div>
			</Container>
		</>
	);
}

ContactUsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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