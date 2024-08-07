import * as React from 'react';
import logoLong from '../../assets/images/logo-long.png';
import { Link } from 'react-scroll';
import { useSelector } from 'react-redux';
import AccountPopover from 'src/layouts/dashboard/header/AccountPopover';
import { SIGNUP_ROUTE } from 'src/utils/routeNames';
import { useNavigate } from 'react-router-dom';

export const HomeHeader = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const onGoToSignup = () => navigate(SIGNUP_ROUTE);

  return (
    <header className="bg-white bg-opacity-30">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex">
              <img className="object-contain w-[150px] h-[60px]" src={logoLong} />
            </a>
          </div>

          {user?.id ? (
            <AccountPopover />
          ) : (
            <button
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
              role="button"
              onClick={onGoToSignup}
            >
              {' '}
              Join Now{' '}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
