import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import { fetchDocumentsByContains, FetchPostData } from 'src/Firebase Functions/ReadDocument';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { ArrowBack } from '@mui/icons-material';
import person from 'src/assets/images/person_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PROFILE_PAGE, SINGLE_POST_PAGE } from 'src/utils/routeNames';

export const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const timeRef = useRef();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  useEffect(() => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      if (searchText.length > 2) {
        fetchDocumentsByContains({ collectionName: 'users', fieldName: 'storeName', searchValue: searchText })
          .then((res) => {
            setlist(res);
          })
          .catch((e) => {
            dispatch(onOpenAlertAction({ type: 'error', message: e }));
          });
        return;
      }
      setlist([]);
    }, 500);

    FetchPostData().then((data) => {
      setLoading(false);
      const shuffledData = shuffleArray(data); // Shuffle the data
      setPosts(shuffledData);
    });
  }, [searchText]);

  const onBlur = () => {
    setFocused(false);
    setSearchText('');
  };

  const navigateToSearchProfile = (id) => navigate(`${SEARCH_PROFILE_PAGE}/${id}`);
  const navigateToPostPage = (id) => navigate(`${SINGLE_POST_PAGE}/${id}`);

  return (
    <div className="w-full">
      {focused ? (
        <div className="w-full sticky top-0 z-10 bg-transparent flex items-center">
          <ArrowBack onClick={onBlur} className="mt-4 ml-1" />
          <input
            onFocus={() => setFocused(true)}
            type="text"
            placeholder="Search..."
            name="text"
            className="input w-full mt-4 ml-2 mr-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      ) : (
        <div className="w-full sticky top-0 px-4 z-10 bg-transparent flex items-center">
          <input
            onFocus={() => setFocused(true)}
            type="text"
            placeholder="Search..."
            name="text"
            className="input w-full mt-4"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}

      {focused ? (
        <div className="w-full mt-4">
          {list?.map((item, i) => (
            <div className="px-4">
              <SearchCard
                key={i}
                profileImage={item?.profileImage || person}
                name={item?.storeName}
                category={item?.storeCategory}
                onClick={() => navigateToSearchProfile(item?.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 max-w-[400px] mt-4 place-items-center">
          {posts?.map((item, i) => {
            // Determine the grid classes for the item
            const isFeatured = i % 21 === 0;
            return (
              <div
                style={{
                  gridColumn: isFeatured ? 'span 2' : 'auto',
                  gridRow: isFeatured ? 'span 2' : 'auto',
                }}
                className={`flex items-center justify-center h-full bg-black  ${
                  isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                <img
                  onClick={() => navigateToPostPage(item?.id)}
                  key={i}
                  className={`object-cover`}
                  src={item?.imageURL?.[0]}
                  alt="search"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
