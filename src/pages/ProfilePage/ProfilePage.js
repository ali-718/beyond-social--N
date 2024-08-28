import React, { useEffect, useState } from 'react';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { useFetchDocuments, useFetchDocumentsById } from 'src/Firebase Functions/ReadDocument';
import { ProfileScreen } from 'src/components/ProfileComponents/ProfileScreen';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { useNavigate } from 'react-router-dom';
import { PROFILE_EDIT_PAGE } from 'src/utils/routeNames';
import { addDocument, addDocumentsBatch } from 'src/Firebase Functions/AddDocument';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const localUser = retrieveUser();
  const user = useFetchDocumentsById({ collectionName: 'users', id: localUser?.id, where: '' });

  const onNavigateEditPage = () => navigate(PROFILE_EDIT_PAGE);

  useEffect(() => {
    user.then((data) => {
      setUserProfile(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <FullLoading />;
  }

  return <ProfileScreen onNavigateEditPage={onNavigateEditPage} user={userProfile} />;
};
