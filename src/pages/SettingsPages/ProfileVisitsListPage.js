import React, { useEffect, useState } from 'react';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import person from 'src/assets/images/person_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PROFILE_PAGE } from 'src/utils/routeNames';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { fetchMyProfileVisitsWithUserData, fetchProfileVisitsProfile } from 'src/Firebase Functions/ReadDocument';

export const ProfileVisitsListPage = ({ isMy }) => {
  const [list, setlist] = useState([]);
  const localUser = retrieveUser();
  const navigate = useNavigate();
  const navigateToSearchProfile = (id) => navigate(`${SEARCH_PROFILE_PAGE}/${id}`);

  useEffect(() => {
    if (!isMy) {
      fetchProfileVisitsProfile({ mainId: localUser?.id }).then((data) => {
        setlist(data);
      });
    } else {
      fetchMyProfileVisitsWithUserData({ userId: localUser?.id }).then((data) => {
        setlist(data);
        console.log({ data });
      });
    }
  }, []);

  return (
    <div>
      <div className="w-full mt-4 px-4">
        {list?.map((item, i) => (
          <SearchCard
            key={i}
            profileImage={item?.profileImage || person}
            name={item?.storeName || item?.name}
            category={item.date}
            onClick={() => navigateToSearchProfile(item?.id)}
          />
        ))}
      </div>
    </div>
  );
};
