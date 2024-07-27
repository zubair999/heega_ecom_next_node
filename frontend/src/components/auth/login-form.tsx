
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSession, signIn } from 'next-auth/react';



const LoginForm: React.FC = () => {
	const Router = useRouter();
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const {register, handleSubmit, formState: { errors }, } = useForm<LoginInputType>();


	const {data:session, status} = useSession();

	console.log("facebooooooo")
	console.log(session)


	function onSubmit({ email, password, remember_me }: LoginInputType) {
		
	}

	function handleGoogleLogin() {
		signIn('google', {callbackUrl: 'http://localhost:3000', redirect: false })
	}

	function handleFacebookLogin() {
		signIn('facebook', {callbackUrl: 'http://localhost:3000', redirect: false })
	}

	function handleSignUp() {
		// setModalView("SIGN_UP_VIEW");
		// return openModal();
		Router.push("/register")
	}

	function handleForgetPassword() {
		setModalView("FORGET_PASSWORD");
		return openModal();
	}

	return (
		<div className="overflow-hidden bg-white mx-auto  w-full sm:w-96 md:w-450px py-2 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<p className="text-sm md:text-4xl font-bold text-black mt-2 mb-8 sm:mb-10">
					Login
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
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
					
					<PasswordInput
						labelKey="forms:label-password"
						errorKey={errors.password?.message}
						{...register("password", {
							required: `${t("forms:password-required")}`,
							pattern: {
								value:
									/^[a-zA-Z0-9]{5,}$/,
								message: t("forms:password-required-min"),
							},
						})}
					/>
					{/* <div className="flex items-center justify-center">
						<div className="flex ms-auto">
							<button
								type="button"
								onClick={handleForgetPassword}
								className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
							>
								{t("common:text-forgot-password")}
							</button>
						</div>
					</div> */}
					<div className="relative">
						<Button
							type="submit"
							loading={false}
							disabled={false}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							{t("common:text-login")}
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
			<div className="flex justify-center gap-8">
				<span className="cursor-pointer" onClick={handleGoogleLogin}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={30}
						height={30}
						viewBox="-0.5 0 48 48"
					>
						<title>{"Google-color"}</title>
						<g fill="none" fillRule="evenodd">
						<path
							fill="#FBBC05"
							d="M9.827 24c0-1.524.253-2.986.705-4.356l-7.909-6.04A23.456 23.456 0 0 0 .213 24c0 3.737.868 7.26 2.407 10.388l7.905-6.05A13.885 13.885 0 0 1 9.827 24"
						/>
						<path
							fill="#EB4335"
							d="M23.714 10.133c3.311 0 6.302 1.174 8.652 3.094L39.202 6.4C35.036 2.773 29.695.533 23.714.533a23.43 23.43 0 0 0-21.09 13.071l7.908 6.04a13.849 13.849 0 0 1 13.182-9.51"
						/>
						<path
							fill="#34A853"
							d="M23.714 37.867a13.849 13.849 0 0 1-13.182-9.51l-7.909 6.038a23.43 23.43 0 0 0 21.09 13.072c5.732 0 11.205-2.036 15.312-5.849l-7.507-5.804c-2.118 1.335-4.786 2.053-7.804 2.053"
						/>
						<path
							fill="#4285F4"
							d="M46.145 24c0-1.387-.213-2.88-.534-4.267H23.714V28.8h12.604c-.63 3.091-2.346 5.468-4.8 7.014l7.507 5.804c4.314-4.004 7.12-9.969 7.12-17.618"
						/>
						</g>
					</svg>
				</span>
				<span className="cursor-pointer" onClick={handleFacebookLogin}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={30}
						height={30}
						viewBox="126.445 2.281 589 589"
					>
						<circle cx={420.945} cy={296.781} r={294.5} fill="#3c5a9a" />
						<path
						fill="#fff"
						d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"
						/>
					</svg>
				</span>
				<span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={35}
						height={35}
						className="icon"
						viewBox="0 0 1024 1024"
					>
						<path fill="#FFE8CD" d="M32 512a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z" />
						<path
						fill="#FF9D1C"
						d="M678.4 780.8H345.6c-25.6 0-44.8-19.2-44.8-44.8V249.6c0-25.6 19.2-44.8 44.8-44.8h332.8c25.6 0 44.8 19.2 44.8 44.8V736c0 25.6-19.2 44.8-44.8 44.8z"
						/>
						<path
						fill="#FFCA83"
						d="M633.6 608H390.4c-19.2 0-32-12.8-32-32V294.4c0-19.2 12.8-32 32-32H640c19.2 0 32 12.8 32 32V576c-6.4 19.2-19.2 32-38.4 32z"
						/>
						<path
						fill="#FFF"
						d="M473.6 697.6a38.4 38.4 0 1 0 76.8 0 38.4 38.4 0 1 0-76.8 0Z"
						/>
					</svg>
				</span>
			</div>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-no-account")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					{t("common:text-register")}
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
