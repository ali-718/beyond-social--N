import React, { useEffect, useState } from 'react';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import person from 'src/assets/images/person_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PROFILE_PAGE, SINGLE_POST_PAGE } from 'src/utils/routeNames';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { getUserLikesWithPosts } from 'src/Firebase Functions/ReadDocument';

export const AllLikeListPage = () => {
  const [list, setlist] = useState([]);
  const localUser = retrieveUser();
  const navigate = useNavigate();
  const navigateToPostPage = (id) => navigate(`${SINGLE_POST_PAGE}/${id}`);

  useEffect(() => {
    getUserLikesWithPosts({ userId: localUser?.id }).then((data) => {
      console.log({ data });
      setlist(data);
    });
  }, []);

  return (
    <div>
      <div className="w-full mt-4">
        {list?.map((item, i) => (
          <SearchCard
            key={i}
            profileImage={item?.post?.imageURL?.[0] || person}
            name={
              <span className="font-thin">
                {`You likes `}
                <span className="font-bold">{item?.user?.storeName}</span> post
              </span>
            }
            category={item?.post?.description}
            onClick={() => navigateToPostPage(item?.post?.id)}
          />
        ))}
      </div>
    </div>
  );
};
