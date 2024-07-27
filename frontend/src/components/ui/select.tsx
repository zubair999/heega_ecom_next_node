import cn from "classnames";
import React, { InputHTMLAttributes } from "react";
import { useTranslation } from "next-i18next";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	inputClassName?: string;
	labelKey?: string;
	placeholderKey?: string;
	// name: string;
	errorKey?: string;
	onChange?: () => void;
	type?: string;
	list: [],
	shadow?: boolean;
	variant?: "normal" | "solid" | "outline";
}


const classes = {
	root:
		"cursor-pointer py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out",
	normal:
		"bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-primary",
	solid:
		"bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12",
	outline: "border-gray-300 focus:border-primary",
	shadow: "focus:shadow",
};
const Select = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className = "block",
			labelKey,
			// name,
			errorKey,
			onChange,
			placeholderKey,
			variant = "normal",
			shadow = false,
			inputClassName,
			list,
			...rest
		},
		ref
	) => {
		const rootClassName = cn(
			classes.root,
			{
				[classes.normal]: variant === "normal",
				[classes.solid]: variant === "solid",
				[classes.outline]: variant === "outline",
			},
			{
				[classes.shadow]: shadow,
			},
			inputClassName
		);
		const { t } = useTranslation();

		const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
			console.log("budy")
			console.log(e);
		}

		return (
			<div className={className}>
				{labelKey && (
					<label
						// htmlFor={name}
						className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
					>
						{t(labelKey)}
					</label>
				)}
				<select className={rootClassName} onChange={handleChange}>
					<option>
						English Willow
					</option>
					{/* <option>
						Kashmir Willow
					</option> */}
				</select>

				{errorKey && <p className="my-2 text-xs text-red-500">{t(errorKey)}</p>}
				{/* <div className="bg-gray-100  h-0 hover:h-10  duration-500">
					Hover Me
				</div> */}
				<div className="border-gray-300 border-0 invisible mt-0 h-0 duration-500 overflow-hidden">
					<ul className="flex justify-center gap-5 py-5 max-h-200">
						<li>
							<img width={100} height={100} src='https://heegasports.com/wp-content/uploads/2022/04/English-Willow.webp' />
						</li>
						<li>
							<img width={100} height={100} src='https://heegasports.com/wp-content/uploads/2022/04/English-Willow.webp' />
						</li>
						<li>
							<img width={100} height={100} src='https://heegasports.com/wp-content/uploads/2022/04/English-Willow.webp' />
						</li>
						<li>
							<img width={100} height={100} src='https://heegasports.com/wp-content/uploads/2022/04/English-Willow.webp' />
						</li>
					</ul>	
				</div>
			</div>
		);
	}
);

export default Select;
