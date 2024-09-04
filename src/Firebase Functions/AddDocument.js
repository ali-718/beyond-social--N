import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  setDoc,
  doc,
  Timestamp,
  updateDoc,
  getDoc,
  increment,
  deleteDoc,
} from 'firebase/firestore';
import { db } from 'src/config';
import { useDispatch } from 'react-redux';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import MD5 from 'crypto-js/md5';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import moment from 'moment';
import { shiftFormat } from 'src/utils/constants';
import { formatDate } from 'src/utils/formatTime';

export const useAddDocument = async ({ data, collectionName }) => {
  const dispatch = useDispatch();
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    dispatch(onOpenAlertAction({ type: 'error', message: `${e}` }));
  }
};

export const addDocument = async ({ data, collectionName }) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    Promise.reject('Error adding document: ' + e.message);
  }
};

export const addDocumentsBatch = async ({ dataArray, collectionName }) => {
  try {
    const promises = dataArray.map((data) => addDoc(collection(db, collectionName), data));
    const docRefs = await Promise.all(promises);
    return docRefs;
  } catch (e) {
    return Promise.reject('Error adding documents: ' + e.message);
  }
};

export const updateSeen = async ({ senderId, receiverId }) => {
  try {
    const messageListRef = collection(db, 'messageList');

    const existingDocQuery = query(
      messageListRef,
      where('senderId', 'in', [senderId, receiverId]),
      where('receiverId', 'in', [senderId, receiverId])
    );

    const querySnapshot = await getDocs(existingDocQuery);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, 'messageList', docId);

      await updateDoc(docRef, {
        isSeen: true,
      });
    }

    return Promise.resolve('Success');
  } catch (error) {
    return Promise.reject(`Error adding/updating message list: ${error.message}`);
  }
};

export const addMessageListData = async ({ senderId, receiverId, lastMessage }) => {
  try {
    const messageListRef = collection(db, 'messageList');

    // Query to check if a document exists with senderId and receiverId or vice versa
    const existingDocQuery = query(
      messageListRef,
      where('senderId', 'in', [senderId, receiverId]),
      where('receiverId', 'in', [senderId, receiverId])
    );

    const querySnapshot = await getDocs(existingDocQuery);

    if (!querySnapshot.empty) {
      // If document exists, update it with the new last message
      const docId = querySnapshot.docs[0].id;
      const docRef = doc(db, 'messageList', docId);

      await updateDoc(docRef, {
        lastMessage: lastMessage,
        timestamp: Timestamp.now(),
        isSeen: false,
      });
    } else {
      // If no document exists, create a new one
      const newDocRef = doc(messageListRef);

      await setDoc(newDocRef, {
        senderId: senderId,
        receiverId: receiverId,
        lastMessage: lastMessage,
        timestamp: Timestamp.now(),
        isSeen: false,
      });
    }

    return Promise.resolve('Success');
  } catch (error) {
    return Promise.reject(`Error adding/updating message list: ${error.message}`);
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

export const userPost = async (data) => {
  const createdAt = formatDate();

  try {
    const docRef = await addDoc(collection(db, 'post'), {
      ...data,
      createdAt,
    });

    return { id: docRef.id, ...data }; // Return the created user data
  } catch (e) {
    return Promise.reject('Error posting document: ' + e.message);
  }
};

export const updatePost = async ({ postId, imageURL, description, externalLink }) => {
  // Get the post document reference
  const postDocRef = doc(db, 'post', postId);
  const postSnapshot = await getDoc(postDocRef);

  if (postSnapshot.exists()) {
    // Update the post data
    try {
      await updateDoc(postDocRef, { imageURL, description, externalLink });
      return 'Post updated successfully';
    } catch (e) {
      return Promise.reject('Error updating post: ' + e.message);
    }
  } else {
    return Promise.reject('Post not found');
  }
};

export const addProfileVisitsTracking = async ({ visitedUserId }) => {
  const localUser = retrieveUser();
  try {
    const docRef = await addDoc(collection(db, 'profileVisits'), {
      mainId: localUser?.id,
      visitedUserId,
      date: moment().format(shiftFormat),
    });
    return docRef;
  } catch (e) {
    Promise.reject('Error adding document: ' + e.message);
  }
};

export const addMyProfileVisit = async ({ otherId }) => {
  const localUser = retrieveUser();
  try {
    const docRef = await addDoc(collection(db, 'myProfileVisit'), {
      myId: localUser?.id,
      otherId,
      date: moment().format('YYYY-MM-DD HH:mm:ss'), // Adjust format if needed
    });
    return docRef;
  } catch (e) {
    return Promise.reject('Error adding document: ' + e.message);
  }
};

export const handlePostLike = async ({ postId, userId, likeOf }) => {
  const likeDocRef = doc(db, 'likes', `${postId}_${userId}`);
  const postDocRef = doc(db, 'post', postId);
  const likeDoc = await getDoc(likeDocRef);
  let currentUserLiked;
  let updatedLikes;

  if (likeDoc.exists()) {
    // If the user already liked the post, remove the like
    await deleteDoc(likeDocRef);
    await updateDoc(postDocRef, {
      likes: increment(-1),
    });

    currentUserLiked = false;
  } else {
    await setDoc(likeDocRef, {
      postId: postId,
      likeBy: userId,
      createdAt: Timestamp.now(),
      likeOf,
    });
    await updateDoc(postDocRef, {
      likes: increment(1),
    });

    currentUserLiked = true;
  }

  const updatedPostDoc = await getDoc(postDocRef);
  updatedLikes = updatedPostDoc.data()?.likes || 0;

  return {
    likes: updatedLikes,
    currentUserLiked: currentUserLiked,
  };
};

export const hasUserLikedPost = async ({ postId, userId }) => {
  const likeDocRef = doc(db, 'likes', `${postId}_${userId}`);
  const likeDoc = await getDoc(likeDocRef);
  return likeDoc.exists();
};

export const addAddressVisit = async ({ otherId }) => {
  const localUser = retrieveUser(); // Assume you have a function to get the current user
  try {
    const docRef = await addDoc(collection(db, 'myAddressVisit'), {
      myId: localUser?.id,
      otherId,
      date: moment().format('YYYY-MM-DD HH:mm:ss'), // Adjust format if needed
    });
    return docRef;
  } catch (e) {
    return Promise.reject('Error adding document: ' + e.message);
  }
};
