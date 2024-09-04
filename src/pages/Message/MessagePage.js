import { ArrowBack, Send } from '@mui/icons-material';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { SearchCard } from 'src/components/SearchCard/SearchCard';
import { addDocument, addMessageListData, updateSeen } from 'src/Firebase Functions/AddDocument';
import { fetchMessagesByUserId, useFetchDocumentsById } from 'src/Firebase Functions/ReadDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { blackColor } from 'src/utils/colors';
import { dateFormat, timeFormat } from 'src/utils/constants';

export const MessagePage = () => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [messageList, setMessageList] = useState([]);
  const user = useFetchDocumentsById({ collectionName: 'users', id: userId, where: '' });
  const textAreaRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    user.then((data) => {
      setUserProfile(data);
      setInterval(() => {
        fetchMessagesByUserId({ userId: localUser?.id, otherUserId: data?.id }).then((msg) => {
          updateSeen({ senderId: localUser?.id, receiverId: data?.id });
          setMessageList(msg);
          setIsLoading(false);
        });
      }, 1000);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const onGoBack = () => navigate(-1);

  const onSendMessage = () => {
    const apiData = {
      senderId: localUser?.id,
      receiverId: userId,
      message: messageText,
      messageType: 'text',
      date: moment().format(dateFormat),
      time: moment().format(timeFormat),
      timestamp: Timestamp.now(),
    };
    setMessageText('');
    textAreaRef.current.style.height = 'auto';
    Promise.all([
      addMessageListData({ senderId: localUser?.id, receiverId: userId, lastMessage: messageText }),
      addDocument({ data: apiData, collectionName: 'messages' }),
    ]);
    const allMessages = [apiData, ...messageList];
    setMessageList(allMessages);
  };

  if (isLoading) {
    return <FullLoading />;
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="w-full top-0 z-10 bg-transparent flex items-center border-b border-gray-300">
        <ArrowBack onClick={onGoBack} className="ml-1" />
        <SearchCard
          profileImage={userProfile?.profileImage}
          name={userProfile?.name}
          category={userProfile?.storeName}
          borderImage
        />
      </div>

      <div className="flex-1 w-full overflow-y-auto px-2 flex flex-col-reverse">
        {messageList?.map((item, i) => (
          <MessageBubble
            time={moment(`${item.date} ${item?.time}`).format('h:mm a [on] Do MMM')}
            key={i}
            message={item?.message}
            senderId={item?.senderId}
            localUser={localUser}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="w-full p-2 flex items-end">
        <textarea
          ref={textAreaRef}
          className="rounded py-2 pl-3 w-full border border-pink-400 resize-none focus:border-pink-400"
          placeholder="Aa"
          rows="1"
          onInput={(e) => {
            e.target.style.height = 'auto'; // Reset height
            e.target.style.height = `${e.target.scrollHeight}px`; // Set height to the scrollHeight
            if (e.target.scrollHeight > 5 * parseInt(getComputedStyle(e.target).lineHeight)) {
              e.target.style.overflowY = 'auto'; // Enable scroll if the content exceeds 5 rows
              e.target.style.height = `${5 * parseInt(getComputedStyle(e.target).lineHeight)}px`;
            } else {
              e.target.style.overflowY = 'hidden'; // Disable scroll otherwise
            }
          }}
          style={{ maxHeight: '5em' }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Send
          onClick={messageText?.length > 0 ? onSendMessage : () => null}
          className={`mx-2 mb-2 text-pink-500 ${messageText?.length > 0 ? 'opacity-100' : 'opacity-50'}`}
        />
      </div>
    </div>
  );
};

const MessageBubble = ({ message, senderId, localUser, time }) => {
  const isCurrentUser = senderId === localUser?.id;

  return (
    <div className={`flex w-full my-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-xs">
        <div
          className={`w-full p-3 rounded-lg ${
            isCurrentUser ? 'bg-pink-400 text-black' : `bg-[${blackColor}] text-white`
          }`}
          style={{ whiteSpace: 'pre-line' }}
        >
          {message}
        </div>
        <p className="text-[12px]">{time}</p>
      </div>
    </div>
  );
};
