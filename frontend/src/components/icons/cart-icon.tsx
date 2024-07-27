const CartIcon = ({
	color = "currentColor",
	width = "30px",
	height = "30px",
	className = "md:w-4 xl:w-5 md:h-4 xl:h-5",
}) => {
	return (
		// <svg
		// 	xmlns="http://www.w3.org/2000/svg"
		// 	width={width}
		// 	height={height}
		// 	viewBox="0 0 20 20"
		// 	className={className}
		// >
		// 	<path
		// 		d="M5,4H19a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4ZM2,5A3,3,0,0,1,5,2H19a3,3,0,0,1,3,3V19a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3Zm10,7C9.239,12,7,9.314,7,6H9c0,2.566,1.669,4,3,4s3-1.434,3-4h2C17,9.314,14.761,12,12,12Z"
		// 		transform="translate(-2 -2)"
		// 		fill={color}
		// 		fillRule="evenodd"
		// 	/>
		// </svg>

		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			>
			<path
			d="M17.8264 20C18.9965 20 19.9167 18.9999 19.8195 17.8339L19.1528 9.83391C19.0664 8.79732 18.1999 8 17.1597 8H16M16 8H12M16 8L16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7L8 8M16 8L16 12M8 8H6.84027C5.80009 8 4.93356 8.79732 4.84718 9.83391L4.18051 17.8339C4.08334 18.9999 5.00352 20 6.1736 20H13M8 8L8 12"
			stroke="#000000"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CartIcon;