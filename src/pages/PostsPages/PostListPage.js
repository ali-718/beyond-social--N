import React, { useEffect } from 'react';
import { PostCard } from 'src/components/Post Components/PostCard';
import { addDocument } from 'src/Firebase Functions/AddDocument';
import { fNumber } from 'src/utils/formatNumber';

export const PostListPage = () => {
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
