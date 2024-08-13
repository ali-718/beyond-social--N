import { ArrowBack } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import {
  fetchDocumentsByQuery,
  fetchUserFollowersData,
  useFetchDocumentsById,
} from 'src/Firebase Functions/ReadDocument';
import { primaryColor } from 'src/utils/colors';
import { SEARCH_PROFILE_PAGE } from 'src/utils/routeNames';
import person from 'src/assets/images/person_placeholder.png';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';

export const SearchFollowersListPage = () => {
  const localUser = retrieveUser();
  const [list, setList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const { userId } = useParams();
  const user = useFetchDocumentsById({ collectionName: 'users', id: userId, where: '' });

  const a11yProps = (index) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  });

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const onGoBack = () => navigate(-1);
  const navigateToSearchProfile = (id) => navigate(`${SEARCH_PROFILE_PAGE}/${id}`);

  useEffect(() => {
    user.then((data) => {
      fetchDocumentsByQuery({ collectionName: 'followers', fieldName: 'mainId', value: data?.id }).then((followers) => {
        fetchUserFollowersData(followers).then((users) => {
          setList(users);
        });
      });

      fetchDocumentsByQuery({ collectionName: 'followers', fieldName: 'followerId', value: data?.id }).then(
        (followers) => {
          fetchUserFollowersData(followers, true).then((users) => {
            setFollowingList(users);
          });
        }
      );
    });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full sticky top-0 z-10 bg-white">
        <div className="w-full flex items-center py-3">
          <ArrowBack onClick={onGoBack} className="ml-1" />
          <p className="w-full text-center font-bold">Followers & Following</p>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            textColor="inherit"
            sx={{
              '& .Mui-selected': {
                color: primaryColor,
              },
              width: '100%',
            }}
            value={currentTab}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: primaryColor,
              },
            }}
          >
            <Tab sx={{ width: '50%' }} label="Followers" {...a11yProps(0)} />
            <Tab sx={{ width: '50%' }} label="Following" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </div>
      <div className="w-full p-3">
        <input
          type="text"
          placeholder="Search..."
          name="text"
          className="input w-full h-[30px] outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="w-full">
        {currentTab === 0 &&
          list.map((item, i) => (
            <SearchCard
              key={i}
              profileImage={item?.profileImage || person}
              name={item?.storeName}
              category={item?.storeCategory}
              onClick={localUser?.id === item?.id ? () => null : () => navigateToSearchProfile(item?.id)}
            />
          ))}
        {currentTab === 1 &&
          followingList.map((item, i) => (
            <SearchCard
              key={i}
              profileImage={item?.profileImage || person}
              name={item?.storeName}
              category={item?.storeCategory}
              onClick={localUser?.id === item?.id ? () => null : () => navigateToSearchProfile(item?.id)}
            />
          ))}
      </div>
    </div>
  );
};
