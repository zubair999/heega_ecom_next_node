import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  IoHomeOutline,
  IoCartOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import { useLogoutMutation } from '@framework/auth/use-logout';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '@utils/routes';
import { useSession, signIn, signOut } from 'next-auth/react'

const AccountNav = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation('common');

  const accountMenu = [
    { slug: ROUTES.ACCOUNT, name: 'Dashboard', icon: <IoHomeOutline className="w-5 h-5" /> },
    { slug: ROUTES.ORDERS, name: 'Orders', icon: <IoCartOutline className="w-5 h-5" /> },
    { slug: ROUTES.WARRANTY, name: 'Warranty Request', icon: <IoSettingsOutline className="w-5 h-5" /> },
    { slug: ROUTES.ACCOUNT_DETAILS, name: 'Account Info', icon: <IoPersonOutline className="w-5 h-5" /> },
	{ slug: ROUTES.ADDRESS, name: 'Address', icon: <IoSettingsOutline className="w-5 h-5" /> },
  ];

  const logoutHandler = () => {
    // console.log("hello")
    signOut()
  };

  const currentPath = pathname.split('/').slice(2, 3)[0];

  return (
    <nav className="flex flex-col md:w-1/5 2xl:w-1/5 md:pe-8 lg:pe-12 xl:pe-16 2xl:pe-20 pb-2 md:pb-0">
      {accountMenu.map(item => {
        const menuPath = item.slug.split('/').slice(2, 3)[0];
        const isActive = currentPath === menuPath;

        return (
          <Link key={item.slug} href={item.slug}>
            <a
              className={`flex items-center cursor-pointer text-sm lg:text-sm text-heading py-1 px-4 lg:px-5 rounded mb-2 ${isActive ? ' font-semibold' : 'font-normal'}`}
            >
              <span className="ps-2">{item.name}</span>
            </a>
          </Link>
        );
      })}
      <button
        className="flex items-center cursor-pointer text-sm lg:text-sm text-heading font-normal py-1 px-4 lg:px-5 focus:outline-none"
        onClick={logoutHandler}
      >
        <span className="ps-2">Logout</span>
      </button>
    </nav>
  );
};

export default AccountNav;
