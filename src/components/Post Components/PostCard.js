import React, { useEffect } from 'react';
import {
  FavoriteBorderOutlined,
  Favorite,
  ShoppingBag,
  FacebookRounded,
  Instagram,
  Twitter,
  WhatsApp,
  MoreVert,
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
import { IconButton, Menu, MenuItem } from '@mui/material';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { CreatePost } from 'src/pages/PostsPages/CreatePost';

const ITEM_HEIGHT = 48;

const options = ['Edit Post'];

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [likes, setLikes] = useState(postLikes);
  const [openModal, setOpenModal] = useState(false);
  const openExternalLink = () => {
    window.open(externalLink);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEditPost = () => setOpenModal(true);

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

  const onEditSuccessfull = () => {
    window.location.reload();
  };

  return (
    <div class={`bg-gray-200 flex items-center justify-center overflow-hidden w-[${window.screen.width}]`}>
      <card class="bg-white border-gray-300 border w-full">
        <header class="items-center p-3 border-b border-b-gray-300 flex justify-between">
          <div onClick={navigateToSearchProfile} class="flex items-center">
            <img src={user?.profileImage || person} class="rounded-full w-10 h-10" />

            <div class="text-sm font-semibold ml-4">{user?.storeName || user?.name}</div>
          </div>
          {localUser?.id === user?.id && (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          )}

          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={onEditPost}>
                {option}
              </MenuItem>
            ))}
          </Menu>

          <ModalComponent onClose={() => setOpenModal(false)} open={openModal}>
            <CreatePost editPostData={otherProps} onEditSuccessfull={onEditSuccessfull} />
          </ModalComponent>
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
