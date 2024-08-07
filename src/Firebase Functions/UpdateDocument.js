import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'src/config';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';

export const useUpdateDocument = async ({ id, updatedData, collectionName }) => {
  const dispatch = useDispatch();
  const docRef = doc(db, collectionName, id);
  try {
    await updateDoc(docRef, updatedData);
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
  }
};
