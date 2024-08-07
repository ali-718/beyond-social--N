import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from 'src/utils/routeNames';
import heroImage from 'src/assets/images/Hero.png';
import { primaryColor } from 'src/utils/colors';

export const HomeHero = () => {
  const navigate = useNavigate();
  const onGoToSignup = () => navigate(SIGNUP_ROUTE);
  const onGoToLogin = () => navigate(LOGIN_ROUTE);
  const user = useSelector((state) => state.user.user);

  return (
    <div className="bg-white">
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className=" mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="px-4">
              <p className="text-base font-semibold tracking-wider text-black uppercase">
                A social media for Influencers
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                We make things happen
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">Grow your sales fast with right customers.</p>

              {!user?.id && (
                <button
                  onClick={onGoToSignup}
                  className={`inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-[${primaryColor}] rounded-full lg:mt-16 hover:bg-[${primaryColor}] focus:bg-[${primaryColor}]`}
                >
                  Join for free
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              )}

              {!user?.id && (
                <p className="mt-5 text-gray-600">
                  Already joined us?{' '}
                  <a onClick={onGoToLogin} className="text-black transition-all duration-200 hover:underline">
                    Log in
                  </a>
                </p>
              )}
            </div>

            <div>
              <img className="w-full" src={heroImage} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
