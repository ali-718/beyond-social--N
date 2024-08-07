import { doc, deleteDoc } from 'firebase/firestore';
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
