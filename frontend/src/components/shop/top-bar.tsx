import { Drawer } from "@components/common/drawer/drawer";
import FilterIcon from "@components/icons/filter-icon";
import { useUI } from "@contexts/ui.context";
import FilterSidebar from "@components/shop/filter-sidebar";
import ListBox from "@components/ui/list-box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";

const SearchTopBar = () => {
	const { openFilter, displayFilter, closeFilter } = useUI();
	const { t } = useTranslation("common");
	const { locale } = useRouter();
	const dir = getDirection(locale);
	const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };
	return (
		<div className="flex justify-end items-center mb-4">
			<button
				className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
				onClick={openFilter}
			>
				<FilterIcon />
				<span className="ps-2.5">{t("text-filters")}</span>
			</button>
			<div className="flex items-center justify-between w-full">
				<div className="flex-shrink-0 font-semibold text-black md:text-xl leading-4 pe-4 md:me-6 ps-2 hidden lg:block">
					14 products
				</div>
				<ListBox
					options={[
						{ name: "Low to high", value: "lh" },
						{ name: "Hight to low", value: "hl" },
					]}
				/>
			</div>
			<Drawer
				placement={dir === "rtl" ? "right" : "left"}
				open={displayFilter}
				onClose={closeFilter}
				handler={false}
				showMask={true}
				level={null}
				contentWrapperStyle={contentWrapperCSS}
			>
				<FilterSidebar />
			</Drawer>
		</div>
	);
};

export default SearchTopBar;
