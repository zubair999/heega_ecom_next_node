import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import type { FC } from "react";



interface AllFilterProps {
	filter_name?: string;
	options:[]
	filter_key: string
}

export const AllFilter: FC<AllFilterProps>   = ({ filter_name, options, filter_key }) => {
	const router = useRouter();
	const { pathname, query } = router;

	let searchParams = new URLSearchParams(document.location.search);
	const selectedOptions = searchParams.get(filter_key) != null ? (searchParams.get(filter_key) as string)?.split(',') : [];
	const [formState, setFormState] = React.useState<string[]>(selectedOptions);
	React.useEffect(() => {
		setFormState(selectedOptions);
	}, [searchParams.get(filter_key)]);


	function handleItemClick(e: React.FormEvent<HTMLInputElement>, ): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		setFormState(currentFormState);
		delete query[filter_key]
		const { ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					["page"]: 1,
					...(currentFormState.length > 0 ? { [filter_key] : currentFormState.join(",") } : {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{filter_name}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{options?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.label}
						name={item.label.toLowerCase()}
						checked={formState.includes(item.value)}
						value={item.value}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
