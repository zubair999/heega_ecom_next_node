import Link from "@components/ui/link";
import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import { ROUTES } from "@utils/routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

export default function AccountPage() {
	const { t } = useTranslation("common");
	return (
		<AccountLayout>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-3 xl:mb-5">
				{t("text-dashboard")}
			</h2>
		</AccountLayout>
	);
}

AccountPage.Layout = Layout;

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
