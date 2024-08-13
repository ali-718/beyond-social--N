import React from 'react';
import person from 'src/assets/images/person_placeholder.png';
import './style.css';
import { fShortenNumber } from 'src/utils/formatNumber';
import { blackColor, primaryColor } from 'src/utils/colors';
import { useNavigate } from 'react-router-dom';
import { PROFILE_FOLLOWERS_PAGE } from 'src/utils/routeNames';

export const ProfileScreen = ({
  onUnfollowUser,
  onFollowUser,
  isFollowing,
  user,
  posts = [],
  isOther = false,
  onNavigateEditPage,
}) => {
  const navigate = useNavigate();
  const {
    storeCategory = '',
    profileImage = '',
    storeName = '',
    phone = '',
    storeAddress = '',
    name = '',
    followers = 0,
    following = 0,
    bio = '',
    email = '',
    postLength = 0,
    ...userProps
  } = user;

  const onOpenAddress = () => window.open(`http://maps.google.com/?q=${storeAddress}`);
  const onOpenEmail = () =>
    window.open(`mailto:${email}?subject=Inquiry&body=Hi my name is ${name}, I found this store on Beyond Social.`);
  const onOpenPhone = () => window.open(`tel:${phone}`);
  const onNavigateFollowersPage = () => navigate(`${PROFILE_FOLLOWERS_PAGE}/${userProps?.id}`);

  return (
    <main className="bg-gray-100 bg-opacity-25">
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <header className="p-4 md:py-8">
          <div className="flex flex-wrap items-center ">
            <div className="md:w-3/12 md:ml-16">
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                 border-2 border-yellow-600 p-1"
                src={profileImage || person}
                alt="profile"
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-2xl inline-block font-light">{storeName}</h2>
              </div>
            </div>
          </div>
          {storeCategory && <p className="font-bold mt-2">{storeCategory}</p>}
          <div>
            <p>{bio}</p>
          </div>
          <div className="mt-2 text-[14px]">
            {name && <p className="mt-2 font-bold">🧑🏻 {name}</p>}
            {storeAddress && (
              <p onClick={onOpenAddress} className="mt-2">
                📍 {storeAddress}
              </p>
            )}

            {phone && (
              <p onClick={onOpenPhone} className="mt-2">
                📲 {phone}
              </p>
            )}
            {email && (
              <p onClick={onOpenEmail} className="mt-2">
                📧 {email}
              </p>
            )}
          </div>
          {isOther ? (
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              {isFollowing ? (
                <div
                  onClick={onUnfollowUser}
                  className={`bg-white border border-[${primaryColor}] w-full px-2 py-1 text-black font-semibold text-sm rounded text-center inline-block`}
                >
                  Unfollow
                </div>
              ) : (
                <div
                  onClick={onFollowUser}
                  className={`bg-[${primaryColor}] w-full px-2 py-1 text-black font-semibold text-sm rounded text-center inline-block`}
                >
                  Follow
                </div>
              )}
              <div
                className={`bg-[${blackColor}] w-full px-2 py-1 text-white font-semibold text-sm rounded text-center inline-block`}
              >
                Message
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 w-full mt-4">
              <div
                className={`bg-[${primaryColor}] w-full px-2 py-1 
                         text-black font-semibold text-sm rounded text-center 
                         inline-block`}
                onClick={onNavigateEditPage}
              >
                Edit
              </div>
            </div>
          )}
        </header>

        <div className="px-px md:px-3">
          <ul
            className="flex md:hidden justify-around space-x-8 border-y 
                text-center p-2 text-gray-600 leading-snug text-sm"
          >
            <li>
              <span className="font-semibold text-gray-800 block">{fShortenNumber(postLength)}</span>
              posts
            </li>

            <li onClick={onNavigateFollowersPage}>
              <span className="font-semibold text-gray-800 block">{fShortenNumber(followers)}</span>
              followers
            </li>
            <li onClick={onNavigateFollowersPage}>
              <span className="font-semibold text-gray-800 block">{fShortenNumber(following)}</span>
              following
            </li>
          </ul>

          <div className="flex flex-wrap -mx-px md:-mx-3">
            <div className="w-1/3 p-px md:px-3">
              <a href="#">
                <article className="post bg-gray-100 text-white relative pb-full md:mb-6">
                  <img
                    className="w-full h-full absolute left-0 top-0 object-cover"
                    src="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="image"
                  />

                  <i className="fas fa-square absolute right-0 top-0 m-1"></i>
                  <div
                    className="overlay bg-gray-800 bg-opacity-25 w-full h-full absolute 
                            left-0 top-0 hidden"
                  >
                    <div
                      className="flex justify-center items-center 
                                space-x-4 h-full"
                    >
                      <span className="p-2">
                        <i className="fas fa-heart"></i>
                        412K
                      </span>

                      <span className="p-2">
                        <i className="fas fa-comment"></i>
                        2,909
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
