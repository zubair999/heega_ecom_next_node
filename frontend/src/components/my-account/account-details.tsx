import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation, UpdateUserType } from "@framework/customer/use-update-customer";
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

	function onSubmit(input: UpdateUserType) {
		
	}

	return (
		<div
			
		>
			
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
							placeholder="Enter your firstname"
						/>
						<Input
							labelKey="forms:label-last-name"
							{...register("lastName", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							placeholder="Enter your lastname"
						/>
						<Input
							labelKey="forms:label-display-name"
							{...register("displayName", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							placeholder="Enter your display name"
						/>
					</div>
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0">
						
						<Input
							labelKey="forms:label-email-star"
							{...register("email", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							placeholder="Enter your email name"
						/> 	
					</div>

					
					<div className="flex flex-col sm:flex-row sm:space-s-3 space-y-4 sm:space-y-0 ">
						<Input
							labelKey="Current Password"
							{...register("oldpassword", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							placeholder="Enter your current password"
						/>
						<Input
							labelKey="forms:label-new-password"
							{...register("password", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							placeholder="Enter your new password"
						/> 
						<Input
							labelKey="Confirm Password"
							{...register("confirmPassword", {
								required: "forms:first-name-required",
							})}
							variant="solid"
							className="w-full sm:w-1/2"
							errorKey={errors.firstName?.message}
							placeholder="Confirm new password"
						/> 	
					</div>


					

					<div className="relative">
						<Button
							type="submit"
							loading={false}
							disabled={false}
							className="h-12 mt-3 w-full sm:w-44"
						>
							Save Changes
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AccountDetails;
