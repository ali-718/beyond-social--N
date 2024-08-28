import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { ProfileScreen } from 'src/components/ProfileComponents/ProfileScreen';
import { addDocument, addMyProfileVisit, addProfileVisitsTracking } from 'src/Firebase Functions/AddDocument';
import {
  fetchDocumentsById,
  fetchDocumentsByQuery,
  fetchIsFollowingTheUser,
  useFetchDocumentsById,
} from 'src/Firebase Functions/ReadDocument';
import { unFollowUserQuery } from 'src/Firebase Functions/RemoveDocument';
import { updateDocument } from 'src/Firebase Functions/UpdateDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';

export const SearchProfilePage = () => {
  const localUser = retrieveUser();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const user = useFetchDocumentsById({ collectionName: 'users', id: userId, where: '' });

  useEffect(() => {
    user.then((data) => {
      setUserProfile(data);
      fetchIsFollowingTheUser({ followerId: localUser?.id, mainId: data?.id }).then((followers) => {
        if (followers?.length > 0) {
          setIsFollowing(true);
        }
        setIsLoading(false);
        addProfileVisitsTracking({ visitedUserId: data?.id });
        addMyProfileVisit({ otherId: data?.id });
      });
    });
  }, []);

  const onFollowUser = () => {
    fetchDocumentsById({ collectionName: 'users', id: localUser?.id, where: '' }).then((personalUser) => {
      addDocument({
        collectionName: 'followers',
        data: {
          mainId: userId,
          followerId: localUser?.id,
          createdAt: Timestamp.now(),
        },
      });
      updateDocument({
        id: userId,
        collectionName: 'users',
        updatedData: { followers: userProfile?.followers ? userProfile?.followers + 1 : 1 },
      });
      updateDocument({
        id: personalUser?.id,
        collectionName: 'users',
        updatedData: { following: personalUser?.following ? personalUser?.following + 1 : 1 },
      });
      setUserProfile({ ...userProfile, followers: userProfile?.followers ? userProfile?.followers + 1 : 1 });
      setIsFollowing(true);
    });
  };

  const onUnfollowUser = () => {
    fetchDocumentsById({ collectionName: 'users', id: localUser?.id, where: '' }).then((personalUser) => {
      unFollowUserQuery({ mainId: userId, followerId: localUser?.id });
      updateDocument({
        id: userId,
        collectionName: 'users',
        updatedData: { followers: userProfile?.followers - 1 },
      });
      updateDocument({
        id: personalUser?.id,
        collectionName: 'users',
        updatedData: { following: personalUser?.following - 1 },
      });
      setUserProfile({ ...userProfile, followers: userProfile?.followers - 1 });
      setIsFollowing(false);
    });
  };

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <ProfileScreen
      onUnfollowUser={onUnfollowUser}
      onFollowUser={onFollowUser}
      isFollowing={isFollowing}
      isOther
      user={userProfile || {}}
    />
  );
};
