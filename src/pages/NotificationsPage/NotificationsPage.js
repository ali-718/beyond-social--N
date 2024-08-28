import { ArrowBack } from '@mui/icons-material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import { getUserNotifications } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { shiftFormat } from 'src/utils/constants';
import { SEARCH_PROFILE_PAGE, SINGLE_POST_PAGE } from 'src/utils/routeNames';

export const NotificationsPage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const notificationList = useSelector((state) => state.user.notifications);
  const isLoading = useSelector((state) => state.user.notsLoading);

  const navigateToSearchProfile = (id) => navigate(`${SEARCH_PROFILE_PAGE}/${id}`);
  const navigateToPostPage = (id) => navigate(`${SINGLE_POST_PAGE}/${id}`);

  useEffect(() => {
    getUserNotifications({ userId: localUser?.id }).then((data) => {
      localStorage.setItem('notificationsCount', data.length);
    });
  }, []);

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div className="w-full px-4 pt-4">
      <p className="text-xl font-bold">Notifications</p>
      <div className="mt-4">
        {notificationList?.map((item, i) => (
          <SearchCard
            key={i}
            profileImage={item?.user?.profileImage}
            name={
              item?.type === 'follow' ? (
                <span className="font-bold text-[14px]">
                  {item?.user?.storeName || item?.user?.name}
                  <span className="font-thin"> started following you</span>
                </span>
              ) : (
                <span className="font-bold text-[14px]">
                  {item?.user?.storeName || item?.user?.name}
                  <span className="font-thin"> liked your post</span>
                </span>
              )
            }
            onClick={() => navigateToSearchProfile(item?.user?.id)}
            rightComponent={
              item?.type === 'like' && (
                <img
                  onClick={() => navigateToPostPage(item?.post?.id)}
                  className="w-[35px] h-[35px] object-cover rounded ml-2"
                  src={item?.post?.imageURL?.[0]}
                />
              )
            }
            category={moment(item?.createdAt.toDate()).format(shiftFormat)}
          />
        ))}
      </div>
    </div>
  );
};
