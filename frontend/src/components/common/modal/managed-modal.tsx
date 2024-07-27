import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
const SearchLocationForm = dynamic(() => import("@components/location/search-location-form"));
const SizeChart = dynamic(() => import("@components/size-chart/size-chart"));
const ManagedModal: React.FC = () => {
	const { displayModal, closeModal, modalView } = useUI();
	return (
		<Modal open={displayModal} onClose={closeModal}>
			{modalView === "SEARCH_LOCATION_VIEW" && <SearchLocationForm />}
			{modalView === "SIZE_CHART" && <SizeChart />}
		</Modal>
	);
};

export default ManagedModal;
