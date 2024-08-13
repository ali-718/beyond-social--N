import React from 'react';
import { FavoriteBorderOutlined, Favorite, Message, ShoppingBag, Comment, CommentBank } from '@mui/icons-material';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Style.css';

export const PostCard = ({ user, images, likes, description, comments, time, commentsLength, externalLink }) => {
  const openExternalLink = () => {
    window.open(externalLink);
  };
  return (
    <div class={`bg-gray-200 flex items-center justify-center overflow-hidden w-[${window.screen.width}]`}>
      <card class="bg-white border-gray-300 border w-full">
        <header class="items-center p-3 border-b border-b-gray-300 flex items-center">
          <div class="">
            <img src={user?.profileImage} class="rounded-full w-10 h-10" />
          </div>

          <div class="text-sm font-semibold ml-4">{user?.name}</div>
        </header>

        <Slide autoplay={false} arrows={false} transitionDuration={100}>
          {images?.map((item, i) => (
            <div className="each-slide-effect">
              <div style={{ backgroundImage: `url(${item})` }}></div>
            </div>
          ))}
        </Slide>

        <content class="flex flex-col p-4 gap-3">
          <div class="flex justify-between items-center">
            <div class="flex flex-row gap-3">
              <FavoriteBorderOutlined />

              <CommentBank />
            </div>

            <ShoppingBag onClick={openExternalLink} />
          </div>

          <div class="text-sm font-semibold">{likes || 0} Likes</div>

          <div class="text-sm">
            <span class="font-semibold">{user?.name}</span> {description}
          </div>
          {commentsLength > 0 && (
            <div class="text-gray-500 text-sm">View all {commentsLength > 1 && `${commentsLength}`} comments</div>
          )}

          <div class="text-gray-400 text-xs">2 HOURS AGO</div>
        </content>

        <footer></footer>
      </card>
    </div>
  );
};
