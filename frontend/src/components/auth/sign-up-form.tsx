import React, { useState } from "react";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";



const SignUpForm: React.FC = () => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpInputType>();

	function handleSignIn() {	
	}

	function onSubmit({ name, email, password, phone }: SignUpInputType) {

	}

	

	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			
			<div className="text-center mb-6 pt-2.5">
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					Register
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">	
					<Input
						labelKey="forms:label-name"
						type="text"
						variant="solid"
						{...register("name", {
							required: "forms:name-required",
						})}
						errorKey={errors.name?.message}
					/>
					<Input
						labelKey="forms:label-email"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${t("forms:email-required")}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t("forms:email-error"),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<Input
						labelKey="forms:label-phone"
						type="phone"
						variant="solid"
						{...register("phone", {
							required: `${t("forms:phone-required")}`,
							pattern: {
								value:
									/^[6789]\d{9}$/,
								message: t("forms:phone-required"),
							},
						})}
						errorKey={errors.phone?.message}
					/>
					
					<PasswordInput
						labelKey="forms:label-password"
						errorKey={errors.password?.message}
						{...register("password", {
							required: `${t("forms:password-required")}`,
							pattern: {
								value:
									/^[a-zA-Z0-9]{8,}$/,
								message: t("forms:password-required-min"),
							},
						})}
					/>
					<div className="relative">
						<Button
							type="submit"
							loading={false}
							disabled={false}
							className="h-11 md:h-12 w-full mt-2"
						>
							{t("common:text-register")}
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>

			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-have-account")}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t("common:text-login")}
				</button>
			</div>
		</div>
	);
};

export default SignUpForm;
