import React, { useRef } from "react";
import { siteSettings } from "@settings/site-settings";
import HeaderMenu from "@components/layout/header/header-menu";
import Logo from "@components/ui/logo";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { addActiveScroll } from "@utils/add-active-scroll";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/router";



const AuthMenu = dynamic(() => import("./auth-menu"), { ssr: false });

const CartButton = dynamic(() => import("@components/cart/cart-button"), {
	ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {

	const {
		openSidebar,
		setDrawerView,
		openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI();
	const { t } = useTranslation("common");
	const siteHeaderRef = useRef() as DivElementRef;
	addActiveScroll(siteHeaderRef);
	const router  = useRouter()

	function handleLogin() {
		// setModalView("LOGIN_VIEW");
		// return openModal();
		router.push("login")
	}

	function handleMobileMenu() {
		setDrawerView("MOBILE_MENU");
		return openSidebar();
	}

	const { data: session, status } = useSession();


	return (
		<header
			// id="siteHeader"
			ref={siteHeaderRef}
			className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
		>
			<div className="border-b-[1px] border-b-[#eee] innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out ">
				<div className="flex items-center justify-center mx-auto max-w-[1050px] h-full w-full logoCtn">
					<button
						aria-label="Menu"
						className="menuBtn hidden md:flex lg:hidden flex-col items-center justify-center px-5 2xl:px-7 flex-shrink-0 h-full outline-none focus:outline-none"
						onClick={handleMobileMenu}
					>
						<span className="menuIcon">
							<span className="bar" />
							<span className="bar" />
							<span className="bar" />
						</span>
					</button>
					<Logo />

					<HeaderMenu data={site_header.menu}   className="hidden lg:flex ltr:md:ml-6 ltr:xl:ml-10 rtl:md:mr-6 rtl:xl:mr-10"/>
					<div className="hidden md:flex justify-end items-center space-s-6 lg:space-s-5 xl:space-s-8 2xl:space-s-10 ms-auto flex-shrink-0">
						<div className="-mt-0.5 flex-shrink-0">
							<AuthMenu
								CustomerDetail = {session?.user ?? ""}
								isAuthorized={status === 'unauthenticated' ? false : true}
								href={ROUTES.ACCOUNT}
								className="text-sm xl:text-base text-heading"
								btnProps={{
									className:
										"text-sm xl:text-base text-heading focus:outline-none",
									children: t("text-sign-in"),
									onClick: handleLogin,
								}}
							>
								{t("text-account")}
							</AuthMenu>
						</div>
						<CartButton />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
