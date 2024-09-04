import React, { useEffect, useState } from 'react';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import person from 'src/assets/images/person_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PROFILE_PAGE, SINGLE_POST_PAGE } from 'src/utils/routeNames';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { fetchAddressVisitors, getUserLikesWithPosts } from 'src/Firebase Functions/ReadDocument';
import moment from 'moment';
import { shiftFormat } from 'src/utils/constants';

export const AddressVisitsPage = () => {
  const [list, setlist] = useState([]);
  const localUser = retrieveUser();
  const navigate = useNavigate();
  const navigateToPostPage = (id) => navigate(`${SINGLE_POST_PAGE}/${id}`);

  useEffect(() => {
    fetchAdVisitors();
  }, []);

  const fetchAdVisitors = () =>
    fetchAddressVisitors({ myId: localUser?.id }).then((data) => {
      console.log({ data });
      setlist(data);
    });

  return (
    <div>
      <div className="w-full mt-4 px-4">
        {list?.map((item, i) => (
          <SearchCard
            key={i}
            profileImage={item?.imageURL?.[0] || person}
            name={item?.storeName || item?.name}
            category={moment(item?.date).format(shiftFormat)}
            onClick={() => navigateToPostPage(item?.post?.id)}
          />
        ))}
      </div>
    </div>
  );
};
