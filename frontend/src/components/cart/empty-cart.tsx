import React, { FC } from "react";

type EmptyCartProps = {
	width?: number;
	height?: number;
	className?: string;
};

const EmptyCart: FC<EmptyCartProps> = ({
	width = 180,
	height = 309.722,
	className,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
		>
			<path fill="#e67e22" d="M5 2h14v14H5z" />
			<path fill="#ECB176" d="M4 5v16h16V5H4z" />
			<path fill="#f39c12" d="M6 3 4 5h2V3z" />
			<path fill="#f1c40f" d="M5 2v2l1-1z" />
			<path fill="#f39c12" d="m18 3 2 2h-2V3z" />
			<path fill="#f1c40f" d="M19 2v2l-1-1z" />
			<path
			fill="#f39c12"
			d="M12 17c2.761 0 5-2.3 5-5V9h-1v3c0 2.2-1.791 4-4 4-2.21 0-4-1.8-4-4V9H7v3c0 2.7 2.239 5 5 5z"
			/>
			<path
			fill="#ecf0f1"
			d="M12 16c-2.761 0-5-2.3-5-5V8h1v3c0 2.2 1.79 4 4 4 2.209 0 4-1.8 4-4V8h1v3c0 2.7-2.239 5-5 5z"
			/>
			<path fill="#f39c12" d="M17 7v1h-1V7h1zM8 7v1H7V7h1zM4 21l1 1h14l1-1H4z" />
		</svg>
	)
};

export default EmptyCart;
