import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/config';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import MD5 from 'crypto-js/md5';

export const useFetchDocuments = async ({ collectionName }) => {
  const dispatch = useDispatch();
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
  }
};

export const FetchUserByUsernameAndMatchPassword = async ({ email, password }) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const hashedPassword = MD5(password).toString();
    if (hashedPassword === userData.password) {
      return userData;
    } else {
      return Promise.reject('Incorrect password');
    }
  } else {
    return Promise.reject('User not found');
  }
};
