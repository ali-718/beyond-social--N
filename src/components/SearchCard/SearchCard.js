import React from 'react';
import styles from './SearchCard.module.css';
import person from 'src/assets/images/person_placeholder.png';
import { Badge } from '@mui/material';

export const SearchCard = ({
  profileImage,
  name,
  category,
  borderImage,
  showFollowButton,
  rightComponent,
  onClick,
  isSeen = true,
  ...props
}) => {
  return (
    <div className={`${styles.user} w-full px-0`} {...props}>
      {borderImage ? (
        <img
          onClick={onClick}
          src={profileImage || person}
          className={`${styles.image} border-2 border-pink-600`}
          alt="pr"
        />
      ) : (
        <img onClick={onClick} src={profileImage || person} className={styles.image} alt="pr" />
      )}
      <div className={styles.user__content}>
        <div onClick={onClick} className={styles.text}>
          <span className={`${styles.name} ${!isSeen && 'font-bold text-black'}`}>
            {name} {!isSeen && <Badge variant="dot" className="ml-2 mt-[-2px]" badgeContent={' '} color="error" />}
          </span>
          <p className={`${styles.username}  truncate w-[220px] ${!isSeen && 'font-bold text-black'}`}>{category}</p>
        </div>
        {showFollowButton && <button className={styles.follow}>Follow</button>}
        {rightComponent}
      </div>
    </div>
  );
};
