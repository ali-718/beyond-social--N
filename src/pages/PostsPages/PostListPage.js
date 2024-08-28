import React, { useEffect, useState } from 'react';
import { PostCard } from 'src/components/Post Components/PostCard';
import { fNumber } from 'src/utils/formatNumber';
import { FetchPostData, getUserNotifications } from 'src/Firebase Functions/ReadDocument';
import { FullLoading } from 'src/components/FullLoading/FullLoading';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';

export const PostListPage = ({ singlePost }) => {
  const localUser = retrieveUser();
  const { postId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (singlePost) {
        FetchPostData(postId).then((data) => {
          setPosts([data]);
          console.log({ data });
          setLoading(false);
        });
      } else {
        try {
          setLoading(true);
          const data = await FetchPostData();
          setPosts(data);
        } catch (error) {
          console.error('Error fetching post data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return <FullLoading />;
  }

  const metaPost = posts[0];
  return (
    <div className="w-full overflow-y-hidden">
      {posts.map((data) => (
        <>
          <PostCard
            user={data?.user}
            images={data.imageURL}
            description={data.description}
            likes={fNumber(data?.likes)}
            externalLink={data.externalLink}
            createdAt={data.createdAt}
            otherProps={data}
          />
        </>
      ))}
    </div>
  );
};
