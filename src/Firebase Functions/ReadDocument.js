import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
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

export const fetchMessagesByUserId = async ({ userId, otherUserId }) => {
  try {
    const messagesRef = collection(db, 'messages');

    const senderQuery = query(
      messagesRef,
      where('senderId', '==', userId),
      where('receiverId', '==', otherUserId),
      orderBy('timestamp', 'desc')
    );

    const receiverQuery = query(
      messagesRef,
      where('senderId', '==', otherUserId),
      where('receiverId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    const [senderSnapshot, receiverSnapshot] = await Promise.all([getDocs(senderQuery), getDocs(receiverQuery)]);

    const messages = [
      ...senderSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ...receiverSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ];

    messages.sort((a, b) => {
      return b.timestamp.seconds - a.timestamp.seconds || b.timestamp.nanoseconds - a.timestamp.nanoseconds;
    });

    return Promise.resolve(messages);
  } catch (e) {
    return Promise.reject(`Error fetching messages: ${e}`);
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

export const fetchMessageList = async ({ senderId }) => {
  const localUser = retrieveUser();
  try {
    const messageListRef = collection(db, 'messageList');

    const senderQuery = query(messageListRef, where('senderId', '==', localUser?.id));
    const receiverQuery = query(messageListRef, where('receiverId', '==', localUser?.id));

    const [senderSnapshot, receiverSnapshot] = await Promise.all([getDocs(senderQuery), getDocs(receiverQuery)]);

    const uniqueIds = new Set();

    senderSnapshot.forEach((doc) => {
      const data = doc.data();
      uniqueIds.add(data);
    });

    receiverSnapshot.forEach((doc) => {
      const data = doc.data();
      uniqueIds.add({ ...data, receiverId: data?.senderId });
    });

    const fetchPromises = Array.from(uniqueIds).map(async ({ receiverId: id, ...props }) => {
      const userDocRef = doc(db, `users/${id}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return { ...userDocSnap.data(), ...props, id };
      } else {
        return null;
      }
    });

    const usersData = await Promise.all(fetchPromises);
    const filteredUsersData = usersData.filter((user) => user !== null);

    // Sort by timestamp, assuming `timestamp` is a field in your documents
    const sortedUsersData = filteredUsersData.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());

    return Promise.resolve(sortedUsersData);
  } catch (e) {
    console.error(`Error fetching user data: ${e}`);
    return Promise.reject(`Error fetching user data: ${e}`);
  }
};

export const FetchPostData = async (id = null) => {
  if (id) {
    // Fetch a single post by ID
    const postDocRef = doc(db, 'post', id);
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();
      const userId = postData.userId;

      // Fetch the user data for this post
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.exists() ? { ...userDoc.data(), id: userDocRef.id } : null;

      return { ...postData, user: userData, id: postDoc.id };
    } else {
      // Handle case where post doesn't exist
      return null;
    }
  } else {
    // Fetch all posts if no ID is passed
    const valRef = collection(db, 'post');
    const dataDb = await getDocs(valRef);

    const allData = await Promise.all(
      dataDb.docs.map(async (val) => {
        const postData = val.data();
        const userId = postData.userId;

        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.exists() ? { ...userDoc.data(), id: userDocRef.id } : null;

        return { ...postData, user: userData, id: val.id };
      })
    );

    return allData;
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

export const getUserLikesWithPosts = async ({ userId }) => {
  const likesRef = collection(db, 'likes');
  const likesQuery = query(likesRef, where('likeBy', '==', userId));
  const likesSnapshot = await getDocs(likesQuery);

  const likesWithPosts = [];

  for (const likeDoc of likesSnapshot.docs) {
    const likeData = likeDoc.data();
    const postId = likeData.postId;

    const postRef = doc(db, 'post', postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {
      const postData = postDoc.data();

      const postUserId = postData.userId;
      const userRef = doc(db, 'users', postUserId);
      const userDoc = await getDoc(userRef);

      let userData = null;
      if (userDoc.exists()) {
        userData = userDoc.data();
      }

      likesWithPosts.push({
        ...likeData,
        post: {
          ...postData,
          id: postDoc.id,
        },
        user: {
          ...userData,
          id: userDoc.id,
        },
      });
    }
  }

  return likesWithPosts;
};

export const getUserNotifications = async ({ userId }) => {
  const notifications = [];

  // Fetch Followers notifications where the user is the mainId
  const followersRef = collection(db, 'followers');
  const followersQuery = query(followersRef, where('mainId', '==', userId), orderBy('createdAt', 'desc'));
  const followersSnapshot = await getDocs(followersQuery);

  for (const followerDoc of followersSnapshot.docs) {
    const followerData = followerDoc.data();

    // Fetch follower details from users collection
    const followerRef = doc(db, 'users', followerData.followerId);
    const followerDocData = await getDoc(followerRef);

    if (followerDocData.exists()) {
      const followerDetails = { ...followerDocData.data(), id: followerDocData.id };

      notifications.push({
        type: 'follow',
        createdAt: followerData.createdAt,
        user: followerDetails,
      });
    }
  }

  // Fetch Likes notifications where the user's post is liked (likeOf is userId)
  const likesRef = collection(db, 'likes');
  const likesQuery = query(likesRef, where('likeOf', '==', userId), orderBy('createdAt', 'desc'));
  const likesSnapshot = await getDocs(likesQuery);

  for (const likeDoc of likesSnapshot.docs) {
    const likeData = { ...likeDoc.data(), id: likeDoc.id };

    // Skip if the likeBy is the same as userId (don't include user's own likes)
    if (likeData.likeBy === userId) {
      continue;
    }

    // Fetch the user who liked the post
    const likerRef = doc(db, 'users', likeData.likeBy);
    const likerDocData = await getDoc(likerRef);
    // Fetch the post details
    const postRef = doc(db, 'post', likeData.postId);
    const postDocData = await getDoc(postRef);

    if (likerDocData.exists() && postDocData.exists()) {
      const likerDetails = { ...likerDocData.data(), id: likerRef.id };
      const postDetails = { ...postDocData.data(), id: postRef.id };

      notifications.push({
        type: 'like',
        createdAt: likeData.createdAt,
        user: likerDetails,
        post: postDetails,
      });
    }
  }

  // Sort notifications by createdAt (if necessary)
  notifications.sort((a, b) => b.createdAt - a.createdAt);

  return notifications;
};

export const fetchPostsByUserId = async ({ userId }) => {
  try {
    // Reference to the posts collection
    const postsRef = collection(db, 'post');

    // Create a query to fetch posts where the userId matches
    const q = query(postsRef, where('userId', '==', userId));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Extract the posts from the query snapshot
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching posts: ', error);
    return [];
  }
};

export const fetchMyProfileVisitsWithUserData = async ({ userId }) => {
  try {
    const visitsQuery = query(collection(db, 'myProfileVisit'), where('otherId', '==', userId));

    const visitsSnapshot = await getDocs(visitsQuery);

    const visitedUserIds = visitsSnapshot.docs.map((doc) => doc.data().myId);

    if (visitedUserIds.length === 0) {
      return [];
    }

    const userPromises = visitedUserIds.map((userId) => getDoc(doc(db, 'users', userId)));

    const userDocs = await Promise.all(userPromises);

    const visitsWithUserData = userDocs.map((userDoc, index) => {
      const userData = userDoc.exists() ? { ...userDoc.data(), id: userDoc.id } : null;
      return {
        ...visitsSnapshot.docs[index].data(),
        ...userData,
      };
    });

    return visitsWithUserData;
  } catch (e) {
    return Promise.reject('Error fetching profile visits: ' + e.message);
  }
};

export const fetchAddressVisitors = async ({ myId }) => {
  try {
    const collectionRef = collection(db, 'myAddressVisit');
    const q = query(collectionRef, where('otherId', '==', myId));
    const querySnapshot = await getDocs(q);

    const arrayOfVisits = [];
    querySnapshot.forEach((doc) => {
      arrayOfVisits.push({ ...doc.data(), visitId: doc.id });
    });

    if (arrayOfVisits.length === 0) {
      return [];
    }

    const fetchPromises = arrayOfVisits.map(async ({ myId: visitorId, date }) => {
      const userDocRef = doc(db, 'users', visitorId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return { ...userDocSnap.data(), visitorId, date, id: userDocRef?.id };
      } else {
        return null;
      }
    });

    const visitorsData = await Promise.all(fetchPromises);

    const filteredVisitorsData = visitorsData
      .filter((visitor) => visitor !== null)
      .sort((a, b) => moment(b.date).diff(moment(a.date)));

    return Promise.resolve(filteredVisitorsData);
  } catch (e) {
    console.error(`Error fetching address visitors: ${e}`);
    return Promise.reject(`Error fetching address visitors: ${e}`);
  }
};
