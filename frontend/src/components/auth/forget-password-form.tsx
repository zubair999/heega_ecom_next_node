
import { useTranslation } from "next-i18next";



const ForgetPasswordForm = () => {
	const { t } = useTranslation();
	return (
		<div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			Forget Form
		</div>
	);
};

export default ForgetPasswordForm;
