import React, { useEffect, useState } from 'react';
import './messageStyles.css';
import { fetchDocumentsByQuery, fetchMessageList } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import { useNavigate } from 'react-router-dom';
import { MESSAGE_USER } from 'src/utils/routeNames';

export const MessageListPage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const [messageList, setMessageList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessageList({ senderId: localUser?.id }).then((data) => {
      setMessageList(data);
      setIsLoading(false);
    });
  }, []);

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
      <div className="w-full mt-2">
        {messageList
          ?.filter((item) => item?.storeName?.toLowerCase()?.includes(searchText))
          .map((item, i) => (
            <SearchCard
              key={i}
              onClick={() => onGoToMessagePage(item?.id)}
              profileImage={item?.profileImage}
              name={item?.storeName}
              category={item?.lastMessage}
            />
          ))}
      </div>
    </div>
  );
};
