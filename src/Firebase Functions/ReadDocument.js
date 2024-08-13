import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/config';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import MD5 from 'crypto-js/md5';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import moment from 'moment';

export const useFetchDocuments = async ({ collectionName }) => {
  const dispatch = useDispatch();
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
  }
};

export const useFetchDocumentsById = async ({ collectionName, id }) => {
  const dispatch = useDispatch();
  try {
    const docRef = doc(collection(db, collectionName), id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { ...docSnapshot.data(), id: docSnapshot.id };
    } else {
      throw new Error('Document does not exist');
    }
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e.message}` }));
  }
};

export const fetchDocumentsById = async ({ collectionName, id }) => {
  try {
    const docRef = doc(collection(db, collectionName), id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return Promise.resolve({ ...docSnapshot.data(), id: docSnapshot.id });
    } else {
      throw new Error('Document does not exist');
    }
  } catch (e) {
    return Promise.reject(`${e}`);
  }
};

export const fetchDocumentsByQuery = async ({ collectionName, fieldName, operator = '==', value }) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(fieldName, operator, value));
    const querySnapshot = await getDocs(q);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });

    return Promise.resolve(documents);
  } catch (e) {
    return Promise.reject(`Error fetching documents: ${e}`);
  }
};

export const fetchIsFollowingTheUser = async ({ followerId, mainId }) => {
  try {
    const collectionRef = collection(db, 'followers');
    const q = query(collectionRef, where('followerId', '==', followerId), where('mainId', '==', mainId));
    const querySnapshot = await getDocs(q);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });

    return Promise.resolve(documents);
  } catch (e) {
    return Promise.reject(`Error fetching documents: ${e}`);
  }
};

export const fetchDocumentsByContains = async ({ collectionName, fieldName, searchValue }) => {
  try {
    const localUser = retrieveUser();
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const searchLowerCase = searchValue.toLowerCase();
    const documents = [];
    querySnapshot.forEach((doc) => {
      const fieldValue = doc.data()[fieldName]?.toLowerCase();
      if (fieldValue && fieldValue.includes(searchLowerCase) && doc.id !== localUser?.id) {
        documents.push({ ...doc.data(), id: doc.id });
      }
    });

    return Promise.resolve(documents);
  } catch (e) {
    return Promise.reject(`Error fetching documents: ${e}`);
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
      return { ...userData, id: userDoc.id };
    } else {
      return Promise.reject('Incorrect password');
    }
  } else {
    return Promise.reject('User not found');
  }
};

export const fetchUserFollowersData = async (arrayOfIds, isFollowing = false) => {
  try {
    const allIds = arrayOfIds.flatMap(({ followerId, mainId }) => (isFollowing ? [mainId] : [followerId]));
    const uniqueIds = [...new Set(allIds)];

    if (uniqueIds.length === 0) {
      return [];
    }

    const fetchPromises = uniqueIds.map(async (id) => {
      const userDocRef = doc(db, `users/${id}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return { ...userDocSnap.data(), id };
      } else {
        return null;
      }
    });

    const usersData = await Promise.all(fetchPromises);

    const filteredUsersData = usersData.filter((user) => user !== null);

    return Promise.resolve(filteredUsersData);
  } catch (e) {
    console.error(`Error fetching user data: ${e}`);
    return Promise.reject(`Error fetching user data: ${e}`);
  }
};

export const fetchProfileVisitsProfile = async ({ mainId }) => {
  try {
    const collectionRef = collection(db, 'profileVisits');
    const q = query(collectionRef, where('mainId', '==', mainId));
    const querySnapshot = await getDocs(q);

    const arrayOfIds = [];
    querySnapshot.forEach((doc) => {
      arrayOfIds.push({ ...doc.data(), id: doc.id });
    });

    const allIds = arrayOfIds.flatMap(({ visitedUserId, date }) => [{ visitedUserId, date }]);
    const uniqueIds = [...allIds];
    if (uniqueIds.length === 0) {
      return [];
    }

    const fetchPromises = uniqueIds.map(async ({ visitedUserId: id, date }) => {
      const userDocRef = doc(db, `users/${id}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return { ...userDocSnap.data(), id, date };
      } else {
        return null;
      }
    });

    const usersData = await Promise.all(fetchPromises);

    const filteredUsersData = usersData
      .filter((user) => user !== null)
      .sort((a, b) => {
        return moment(b.date, 'YYYY-MM-DD hh:mm a').diff(moment(a.date, 'YYYY-MM-DD hh:mm a'));
      });

    return Promise.resolve(filteredUsersData);
  } catch (e) {
    console.error(`Error fetching user data: ${e}`);
    return Promise.reject(`Error fetching user data: ${e}`);
  }
};
