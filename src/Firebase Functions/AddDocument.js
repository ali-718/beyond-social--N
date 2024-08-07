import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';
import { db } from 'src/config';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import MD5 from 'crypto-js/md5';

export const useAddDocument = async ({ data, collectionName }) => {
  const dispatch = useDispatch();
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
  }
};

export const registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  // Check for duplicate email
  const emailQuery = query(collection(db, 'users'), where('email', '==', email));
  const emailSnapshot = await getDocs(emailQuery);
  if (!emailSnapshot.empty) {
    return Promise.reject('Email already in use');
  }

  // Check for duplicate phone
  const phoneQuery = query(collection(db, 'users'), where('phone', '==', phone));
  const phoneSnapshot = await getDocs(phoneQuery);
  if (!phoneSnapshot.empty) {
    return Promise.reject('Phone number already in use');
  }

  // Hash the password
  const hashedPassword = MD5(password).toString();

  // Add the new user to Firestore
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name,
      email,
      password: hashedPassword,
      phone,
      isVerified: false,
      isFirstTime: true,
    });

    return { id: docRef.id, name, email, phone, isVerified: false, isFirstTime: true }; // Return the created user data
  } catch (e) {
    return Promise.reject('Error adding document: ' + e.message);
  }
};
