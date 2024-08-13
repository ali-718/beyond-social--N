import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import { fetchDocumentsByContains } from 'src/Firebase Functions/ReadDocument';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { ArrowBack } from '@mui/icons-material';
import person from 'src/assets/images/person_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PROFILE_PAGE } from 'src/utils/routeNames';
const images = [
  'https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/11/23/11/33/mobile-phone-4646854_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/06/28/05/10/laptop-1483974_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/03/26/22/22/happy-1281590_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/06/27/17/48/fantasy-3502188_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/08/14/04/15/mountains-6544522_960_720.jpg',
  'https://cdn.pixabay.com/photo/2022/04/13/16/18/future-7130603_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg',
  'https://cdn.pixabay.com/photo/2019/11/23/11/33/mobile-phone-4646854_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/06/28/05/10/laptop-1483974_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/03/26/22/22/happy-1281590_1280.jpg',
  'https://cdn.pixabay.com/photo/2018/06/27/17/48/fantasy-3502188_1280.jpg',
  'https://cdn.pixabay.com/photo/2021/08/14/04/15/mountains-6544522_960_720.jpg',
  'https://cdn.pixabay.com/photo/2022/04/13/16/18/future-7130603_1280.jpg',
];

export const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [focused, setFocused] = useState(false);
  const [list, setlist] = useState([]);
  const timeRef = useRef();

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
  }, [searchText]);

  const onBlur = () => {
    setFocused(false);
    setSearchText('');
  };

  const navigateToSearchProfile = (id) => navigate(`${SEARCH_PROFILE_PAGE}/${id}`);

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
            <SearchCard
              key={i}
              profileImage={item?.profileImage || person}
              name={item?.storeName}
              category={item?.storeCategory}
              onClick={() => navigateToSearchProfile(item?.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 max-w-[400px] mt-4 place-items-center">
          {images?.map((item, i) => (
            <img key={i} className="object-cover" src={item} alt="search" />
          ))}
        </div>
      )}
    </div>
  );
};
