import Cart from "@components/cart/cart";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import styles from "./drawer.module.css";

const ManagedDrawer = () => {
	const { displayCart, closeCart } = useUI();
	const { locale } = useRouter();
	const dir = getDirection(locale);
	const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };
	return (
		<Drawer
			open={displayCart}
			placement={dir === "rtl" ? "left" : "right"}
			onClose={closeCart}
			handler={false}
			showMask={true}
			level={null}
			contentWrapperStyle={contentWrapperCSS}
			// className={styles.drawer}
			ease="cubic-bezier(.14,1.22,.89,-0.04)"
			duration="1s"
		>
			<Cart />
		</Drawer>
	);
};

export default ManagedDrawer;
