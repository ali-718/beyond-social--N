import React from 'react';
import styles from './SearchCard.module.css';

export const SearchCard = ({ profileImage, name, category, showFollowButton, ...props }) => {
  return (
    <div className={`${styles.user} w-full`} {...props}>
      <img src={profileImage} className={styles.image} alt="pr" />
      <div className={styles.user__content}>
        <div className={styles.text}>
          <span className={styles.name}>{name}</span>
          <p className={styles.username}>{category}</p>
        </div>
        {showFollowButton && <button className={styles.follow}>Follow</button>}
      </div>
    </div>
  );
};
