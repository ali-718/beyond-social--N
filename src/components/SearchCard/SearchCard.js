import React from 'react';
import styles from './SearchCard.module.css';
import person from 'src/assets/images/person_placeholder.png';

export const SearchCard = ({
  profileImage,
  name,
  category,
  borderImage,
  showFollowButton,
  rightComponent,
  onClick,
  ...props
}) => {
  return (
    <div className={`${styles.user} w-full px-0`} {...props}>
      {borderImage ? (
        <img
          onClick={onClick}
          src={profileImage || person}
          className={`${styles.image} border-2 border-yellow-600`}
          alt="pr"
        />
      ) : (
        <img onClick={onClick} src={profileImage || person} className={styles.image} alt="pr" />
      )}
      <div className={styles.user__content}>
        <div onClick={onClick} className={styles.text}>
          <span className={styles.name}>{name}</span>
          <p className={`${styles.username} truncate w-[250px]`}>{category}</p>
        </div>
        {showFollowButton && <button className={styles.follow}>Follow</button>}
        {rightComponent}
      </div>
    </div>
  );
};
