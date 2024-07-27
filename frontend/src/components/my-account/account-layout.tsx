import { useRouter } from "next/router";
import Container from "@components/ui/container";
import AccountNav from "@components/my-account/account-nav";
import { useSession, signIn, signOut } from 'next-auth/react'


const AccountLayout: React.FunctionComponent<{}> = ({ children }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const isLoggedIn = status == "authenticated" ? true : false;

	

	function removeLeadingSlash(path: string): string {
		if (path.startsWith('/')) {
		  return path.substring(1);
		}
		return path;
	  }
	  
	const return_url = removeLeadingSlash(router.asPath);


	if(isLoggedIn){
		return (
			<>
				<Container>
					<div className="py-16 lg:py-20 px-0 xl:w-full mx-auto flex  md:flex-row w-full">
						<div className="flex flex-col md:flex-row w-full">
							<AccountNav />
							<div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">{children}</div>
						</div>
					</div>
	
				</Container>
			</>
		);
	}
	else{
		// router.replace(`/login?return_url=${return_url}`);
		return null
	}

	




	
};

export default AccountLayout;
