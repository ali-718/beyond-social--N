import { doc, deleteDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from 'src/config';
import { onOpenAlertAction } from 'src/redux/AlertRedux';

export const useDeleteDocument = async ({ id, collectionName }) => {
  const dispatch = useDispatch();
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
  }
};

export const deleteDocument = async ({ id, collectionName }) => {
  const docRef = doc(db, collectionName, id);
  try {
    await deleteDoc(docRef);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(`${e}`);
  }
};

export const unFollowUserQuery = async ({ collectionName = 'followers', followerId, mainId }) => {
  try {
    const q = query(
      collection(db, collectionName),
      where('followerId', '==', followerId),
      where('mainId', '==', mainId)
    );

    const querySnapshot = await getDocs(q);

    const deletePromises = querySnapshot.docs.map((document) => deleteDoc(doc(db, collectionName, document.id)));

    await Promise.all(deletePromises);

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(`${e}`);
  }
};
