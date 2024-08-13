import React from 'react';
import { PostCard } from 'src/components/Post Components/PostCard';
import { fNumber } from 'src/utils/formatNumber';

export const PostListPage = () => {
  const list = [
    {
      user: {},
      images: [
        'https://cdn.pixabay.com/photo/2019/08/04/06/06/boxing-4383119_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/04/15/17/26/box-1331470_1280.jpg',
        'https://scontent.fsyd10-1.fna.fbcdn.net/v/t39.30808-6/449848342_881699037336184_6050400654530357613_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4_nDyewFAeEQ7kNvgGCVG3W&_nc_ht=scontent.fsyd10-1.fna&gid=A0nYyMvbHrJ-nfPgZ-_j3zu&oh=00_AYAH9OysVSbN0imMrqq21PxbWOv0lIE2iSyhmlPPGojURw&oe=66AE4138',
      ],
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      likes: 2300343,
      commentsLength: 300,
      externalLink: 'https://www.stingsports.com.au/collections/boxing-gloves',
      createdAt: '2024-08-02 12:00 pm',
    },
  ];

  return (
    <div className="w-full overflow-y-hidden">
      <PostCard
        user={{ name: 'Naman Chawla', profileImage: 'https://picsum.photos/50/50' }}
        images={[
          'https://www.elinz.com.au/assets/full/101375.jpg?20231212101159',
          'https://www.elinz.com.au/assets/alt_2/101375.jpg?20231212101201',
        ]}
        description={
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        }
        likes={fNumber(2300343)}
        commentsLength={fNumber(300)}
        externalLink={
          'https://www.elinz.com.au/buy/sony-ps5-playstation-5-console-slim/101375?gad_source=1&gclid=Cj0KCQjwiOy1BhDCARIsADGvQnA_EkGbNhk88PFboehg1_8xWMJ2v-sMh6HS90BXga3d1DaWcFxaQrgaAq-YEALw_wcB'
        }
      />
    </div>
  );
};
