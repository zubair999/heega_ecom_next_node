import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import { useTranslation } from "next-i18next";

const defaultValues = {};
const AccountDetails: React.FC = () => {

	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateUserType>({
		defaultValues,
	});

	function onSubmit(input: any) {
	}

	return (
		<motion.div
			layout
			initial="from"
			animate="to"
			exit="from"
			//@ts-ignore
			variants={fadeInTop(0.35)}
			className={`w-full flex flex-col`}
		>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("common:text-add-new")}
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 sm:space-y-5">

					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						<Input
							labelKey="forms:label-first-name"
							{...register("firstName", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							defaultValue={"f"}
						/>
						<Input
							type="tel"
							labelKey="forms:label-phone"
							{...register("phoneNumber", {
								required: "forms:phone-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.phoneNumber?.message}
							defaultValue={"Df"}
						/>
					</div>
					

					<div className="relative">
						<Button
							type="submit"
							loading={false}
							disabled={false}
							className="h-12 mt-3 w-full sm:w-32"
						>
							{t("common:button-save")}
						</Button>
					</div>
				</div>
			</form>
		</motion.div>
	);
};

export default AccountDetails;
