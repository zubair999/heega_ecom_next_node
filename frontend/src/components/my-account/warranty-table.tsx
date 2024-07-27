import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { roundOffTwo } from "../../Constants/index"

const OrdersTable: React.FC = () => {
	const dispatch = useDispatch()
	const { width } = useWindowSize();
	const { t } = useTranslation("common");
	


	const ORDER = useSelector(state => state.Order)

	const order_list = [
		{
			order_id:1,
			created_at: "Sfdds",
			total_price:2653.6
		},
		{
			order_id:2,
			created_at: "Sfdds",
			total_price:2653.6
		},
		{
			order_id:3,
			created_at: "Sfdds",
			total_price:2653.6
		},
	]




	const TableHead = () => {
		return (
			<tr>
				<th className="border-dashed border p-1 text-heading font-semibold text-start first:rounded-ts-md">
					Request Id
				</th>
				<th className="border-dashed border p-1 text-heading font-semibold text-start lg:text-center">
					Order Id
				</th>
				<th className="border-dashed border p-1 text-heading font-semibold text-start lg:text-center">
					Type
				</th>
				<th className="border-dashed border p-1 text-heading font-semibold text-start lg:text-center">
					items
				</th>
				<th className="border-dashed border p-1 text-heading font-semibold text-start lg:text-center">
					Status
				</th>
				<th className="border-dashed border p-1 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
					Created On
				</th>
			</tr>
		)
	}

	const OrderTableView = props => {		
			return order_list.map(item => {
				return (
					<tr className="border-b border-gray-300 last:border-b-0">
						<td className="px-1 py-1 text-start">
							<Link
								href={`/my-account/orders/${item.order_id}`}
								className="underline hover:no-underline text-body"
							>
								#{item.order_id}
							</Link>
						</td>
						<td className="text-start lg:text-center px-1 py-1 text-heading">
							{item.created_at}
						</td>
						<td className="text-start lg:text-center px-1 py-1 text-heading">
							Completed
						</td>
						<td className="text-start lg:text-center px-1 py-1 text-heading">
							₹{roundOffTwo(item.total_price)}
						</td>
						<td className="text-start lg:text-center px-1 py-1 text-heading">
							
						</td>
						<td className="text-end px-1 py-1 text-heading">
							<Link
								href={`/my-account/orders/${item.order_id}`}
								className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
							>
								{t("button-view")}
							</Link>
							<div className="m-1"></div>
						</td>
					</tr>
				)
			})

		

	}

	const OrderListView = props => {
		const order_list = props.order;

		if(props.order.length == 0){
			return null
		}
		else{
			return order_list.map((item) => {
				return (
					<ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
						<li className="flex items-center justify-between">
							{t("text-order")}
							<span className="font-normal">
								<Link
									href={`/my-account/orders/${item.order_id}`}
									className="underline hover:no-underline text-body"
								>
									#{item.order_id}
								</Link>
							</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-date")}
							<span className="font-normal">{item.created_at}</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-status")}
							<span className="font-normal">Completed</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-total")}
							<span className="font-normal">₹{roundOffTwo(item.total_price)}</span>
						</li>
						<li className="flex items-center justify-between">
							{t("text-actions")}
							<span className="font-normal">
								<Link
									href={`/my-account/orders/${item.order_id}`}
									className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
								>
									{t("button-view")}
								</Link>
							</span>
						</li>
					</ul>
				)
			})
		}
	}

	return (
		<>
			<div>
				{width >= 1025 ? (
					<table className='w-full'>
						<thead className="text-sm lg:text-base">
							<TableHead />
						</thead>
						<tbody className="text-sm lg:text-base">
							{/* {
								ORDER.loading ? <div>Loading...</div>
								:
								<OrderTableView order={ORDER.getOrder}/>
							} */}
						</tbody>
					</table>
				) : (
					<div className="w-full space-y-4">
							{/* {
								ORDER.loading ? <div>Loading...</div>
								:
								<OrderListView  order={ORDER.getOrder}/>
							} */}
					</div>
				)}
			</div>
		</>
	);
};

export default OrdersTable;
