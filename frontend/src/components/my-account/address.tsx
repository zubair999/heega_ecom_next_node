import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";


const Address: React.FC = () => {
	const { width } = useWindowSize();
	const { t } = useTranslation("common");

	

	const TableHead = () => {

		return (
			<tr>
				<th className="p-1 text-heading font-semibold text-start first:rounded-ts-md">
					{t("text-srno")}
				</th>
				<th className="p-1 text-heading font-semibold text-start lg:text-center">
					{t("text-address")}
				</th>
			</tr>
		)
	}

	const AddressListCardTableView = props => {
		return (
			<tr className="border-b border-gray-300 last:border-b-0">
				<td className="text-start lg:text-center px-4 py-5 text-heading">
					#1
				</td>
				<td className="text-start lg:text-center px-4 py-5 text-heading">
					Address: my street, mrt,  Postal Code: 259992, State: mahaarash
				</td>
				<th className="border-dashed border p-1 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
					Edit
				</th>
			</tr>
		)
	}

	const AddressListCardListView = props => {
		console.log("props list",props);
		const address_list = props.address;

		if(props.address.length == 0){
			return null
		}
		else{
			return address_list.map((item, index) => {
				return (
					<ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
						<li className="flex items-center justify-between">
							{t("text-srno")}
							<span className="font-normal">#{index+1}</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-address")}
							<span className="font-normal">Address: {item.address}, {item.city_name}, <br /> Postal Code: {item.postal_code}, <br /> State: {item.state_name}</span>
						</li>
					</ul>
				)
			})
		}
	}

	return (
		<>
			<div
				className={`w-full flex flex-col`}
			>
				{width >= 1025 ? (
					<table>
						<thead className="text-sm lg:text-base">
							<TableHead />
						</thead>
						<tbody className="text-sm lg:text-base">
							<AddressListCardTableView />
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
							{
								ADDRESS.loading ? <div>Loading...</div>
								:
								<AddressListCardListView  address={ADDRESS.getAddress}/>
							}
					</div>
				)}
			</div>
		</>
	);
};

export default Address;
