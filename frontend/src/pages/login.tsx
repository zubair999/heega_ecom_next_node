import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import LoginForm from "@components/auth/login-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function SignInPage() {
	return (
		<>
			<Container>
				<div className="py-16 lg:py-10">
					<LoginForm />
				</div>
			</Container>
		</>
	);
}

SignInPage.Layout = Layout;

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
