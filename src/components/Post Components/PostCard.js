import React, { useEffect } from 'react';
import {
  FavoriteBorderOutlined,
  Favorite,
  ShoppingBag,
  FacebookRounded,
  Instagram,
  Twitter,
  WhatsApp,
} from '@mui/icons-material';
import { Slide } from 'react-slideshow-image';
import person from 'src/assets/images/person_placeholder.png';
import 'react-slideshow-image/dist/styles.css';
import './Style.css';
import { handlePostLike, hasUserLikedPost } from 'src/Firebase Functions/AddDocument';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PROFILE_PAGE } from 'src/utils/routeNames';

export const PostCard = ({
  user,
  images,
  likes: postLikes,
  description,
  createdAt,
  commentsLength,
  externalLink,
  otherProps,
}) => {
  const navigate = useNavigate();
  const localUser = retrieveUser();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(postLikes);
  const openExternalLink = () => {
    window.open(externalLink);
  };

  const navigateToSearchProfile = () => navigate(`${SEARCH_PROFILE_PAGE}/${user?.id}`);

  const onLike = () => {
    setIsLiked(true);
    setLikes(`${parseInt(likes) + 1}`);
    handlePostLike({ postId: otherProps?.id, userId: localUser?.id, likeOf: user?.id }).then((res) => {
      if (res.currentUserLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  };

  const onDislike = () => {
    setIsLiked(false);
    setLikes(`${parseInt(likes) - 1}`);
    handlePostLike({ postId: otherProps?.id, userId: localUser?.id, likeOf: user?.id }).then((res) => {
      if (res.currentUserLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  };

  const onPostToTwitter = () => {
    const urlToShare = externalLink;
    const quote = description;

    const facebookShareUrl = `https://twitter.com/intent/tweet?text=${quote}&url=${encodeURIComponent(urlToShare)}`;

    window.open(facebookShareUrl, '_blank');
  };

  const onPostToWhatsapp = () => {
    const encodedText = encodeURIComponent(description);
    const encodedUrl = encodeURIComponent(externalLink);
    const newline = '%0A%0A';

    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedText}${newline}${encodedUrl}`;

    window.open(whatsappShareUrl, '_blank');
  };

  useEffect(() => {
    hasUserLikedPost({ postId: otherProps?.id, userId: localUser?.id }).then((res) => {
      if (res) {
        setIsLiked(true);
      }
    });
  }, []);

  return (
    <div class={`bg-gray-200 flex items-center justify-center overflow-hidden w-[${window.screen.width}]`}>
      <card class="bg-white border-gray-300 border w-full">
        <header onClick={navigateToSearchProfile} class="items-center p-3 border-b border-b-gray-300 flex items-center">
          <div class="">
            <img src={user?.profileImage || person} class="rounded-full w-10 h-10" />
          </div>

          <div class="text-sm font-semibold ml-4">{user?.storeName || user?.name}</div>
        </header>

        <Slide
          autoplay={false}
          indicators={images?.length > 1}
          infinite={false}
          arrows={false}
          transitionDuration={100}
        >
          {images?.map((item, i) => (
            <div className="each-slide-effect flex items-center justify-center h-full bg-black">
              <img src={item} className="object-contain mx-auto" />
            </div>
          ))}
        </Slide>

        <content class="flex flex-col p-4 gap-3">
          <div class="flex justify-between items-center">
            <div class="flex flex-row gap-3">
              {isLiked ? (
                <div className="flex items-center justify-center">
                  <Favorite onClick={onDislike} color="error" />
                  {likes}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <FavoriteBorderOutlined onClick={onLike} />
                  {likes}
                </div>
              )}
              <div className="flex items-center justify-center">
                <Twitter color="info" onClick={onPostToTwitter} />
              </div>
              <div className="flex items-center justify-center">
                <WhatsApp color="success" onClick={onPostToWhatsapp} />
              </div>
            </div>
            {externalLink ? (
              <>
                <ShoppingBag onClick={openExternalLink} />
              </>
            ) : (
              <></>
            )}
          </div>

          <div style={{ whiteSpace: 'pre-line' }} class="text-sm">
            <span class="font-semibold ">{user?.name}</span>
            <br />
            {description}
          </div>

          <div class="text-gray-400 text-xs">{createdAt}</div>
        </content>

        <footer></footer>
      </card>
    </div>
  );
};
