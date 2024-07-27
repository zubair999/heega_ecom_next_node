import Layout from "@components/layout/layout";
import AccountLayout from "@components/my-account/account-layout";
import WarrantyTable from "@components/my-account/warranty-table";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function WarrantyTablePage() {
	return (
		<AccountLayout>
			<WarrantyTable />
		</AccountLayout>
	);
}

WarrantyTablePage.Layout = Layout;

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
