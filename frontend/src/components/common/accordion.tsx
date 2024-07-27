import React, { useState } from "react";
import cn from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { heightCollapse } from "@utils/motion/height-collapse";
import { useTranslation } from "next-i18next";

type CollapseProps = {
	i: number;
	titleKey?: string;
	title?: string;
	content?: any;
	contentKey?: any;
	expanded: number;
	translatorNS: string;
	setExpanded: any;
	variant?: "gray" | "transparent";
};

export const Collapse: React.FC<CollapseProps> = ({
	i,
	expanded,
	setExpanded,
	titleKey,
	title,
	content,
	contentKey,
	translatorNS,
	variant = "gray",
}) => {
	const isOpen = i === expanded;

	const { t } = useTranslation(translatorNS);
	return (
		<div
			className={cn({
				"rounded-md bg-gray-200": variant === "gray",
				"shadow-sm": isOpen,
			},  "border border-gray-300 mb-1")}
		>
			<motion.header
				initial={false}
				onClick={() => setExpanded(isOpen ? false : i)}
				className={cn(
					"cursor-pointer flex items-center justify-center transition-colors py-1 md:py-3 mb-1 px-3",
					{
						"px-6 md:px-8 lg:px-10": variant === "gray",
						// "border border-gray-300": variant === "transparent",
					}
				)}
			>
				<h5
					className={cn(
						"flex-1 text-xs font-300 leading-relaxed text-heading pe-2 tracking-[2.5px] uppercase",
						{
							"md:text-base": variant === "gray",
							"md:text-base lg:text-sm": variant === "transparent",
						}
					)}
				>
					{titleKey ? t(titleKey) : title}
				</h5>
				<div className="flex-shrink-0 relative w-4 h-4 flex justify-center items-center">
					<svg width={"10px"} aria-hidden="true" focusable="false" role="presentation" className={`transition-transform duration-500 ${isOpen ? "rotate-0" : "rotate-180"} `} viewBox="0 0 28 16"><path d="M1.57 1.59l12.76 12.77L27.1 1.59" strokeWidth="2" stroke="#000" fill="none" fillRule="evenodd"></path></svg>
				</div>
			</motion.header>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial="from"
						animate="to"
						exit="from"
						variants={heightCollapse()}
					>
						<div
							className={cn("pb-6 md:pb-7 leading-7 text-sm text-black font-bold mx-6 text-justify", {
								"pt-5 border-t border-gray-300 px-6 md:px-8 lg:px-10":
									variant === "gray",
							})}
						>
							{contentKey ? t(contentKey) : content}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

type AccordionProps = {
	translatorNS: string;
	items: {
		titleKey?: string;
		title?: string;
		contentKey?: string;
		content?: string;
	}[];
	variant?: "gray" | "transparent";
};

const Accordion: React.FC<AccordionProps> = ({
	items,
	translatorNS,
	variant = "gray",
}) => {
	const [expanded, setExpanded] = useState<number>(0);

	return (
		<>
			{items?.map((item, index) => (
				<Collapse
					i={index}
					key={item.titleKey}
					titleKey={item.titleKey}
					contentKey={item.contentKey}
					expanded={expanded}
					setExpanded={setExpanded}
					variant={variant}
					translatorNS={translatorNS}
				/>
			))}
		</>
	);
};

export default Accordion;
