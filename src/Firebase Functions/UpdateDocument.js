import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/config';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';

export const useUpdateDocument = ({ id, updatedData, collectionName }) => {
  const dispatch = useDispatch();

  const invoke = async ({ upData, index, collName }) => {
    try {
      const docRef = doc(db, collectionName || collName, id || index);
      await updateDoc(docRef, updatedData || upData);
      dispatch(onOpenAlertAction({ message: `Welcome !` }));
    } catch (e) {
      dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
    }
  };

  return { invoke };
};

export const updateDocument = async ({ id, updatedData, collectionName }) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updatedData);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(`${e}`);
  }
};
