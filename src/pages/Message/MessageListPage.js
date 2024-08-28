import React, { useEffect, useState } from 'react';
import './messageStyles.css';
import { fetchMessageList } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import { useNavigate } from 'react-router-dom';
import { MESSAGE_USER } from 'src/utils/routeNames';
import { useSelector } from 'react-redux';

export const MessageListPage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const messageList = useSelector((state) => state.user.messageList);
  const isLoading = useSelector((state) => state.user.messageLoading);
  const [searchText, setSearchText] = useState('');

  const onGoToMessagePage = (id) => navigate(`${MESSAGE_USER}/${id}`);

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div className="w-full">
      <div className="w-full top-0 bg-transparent flex items-center px-4 mt-[-10px]">
        <input
          type="text"
          placeholder="Search..."
          name="text"
          className="input w-full mt-4"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="w-full mt-2 px-4">
        {messageList
          ?.filter((item) => item?.storeName?.toLowerCase()?.includes(searchText))
          .map((item, i) => (
            <SearchCard
              key={i}
              onClick={() => onGoToMessagePage(item?.id)}
              profileImage={item?.profileImage}
              name={item?.storeName}
              category={item?.lastMessage}
              isSeen={item?.isSeen}
            />
          ))}
      </div>
    </div>
  );
};
