import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { imgdb } from 'src/config';
import { updatePost, userPost } from 'src/Firebase Functions/AddDocument';
import { MAIN_ROUTE } from 'src/utils/routeNames';
import { useNavigate } from 'react-router-dom';
import { onOpenAlertAction } from 'src/redux/AlertRedux';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { retrieveUser } from 'src/hooks/AuthHooks/AuthHooks';
import moment from 'moment';
import { imageSize, imageUploadBlobStorageUrl, shiftFormat } from 'src/utils/constants';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { primaryColor } from 'src/utils/colors';
import { useApiHook } from 'src/hooks/apiHook';
import { CircularProgress } from '@mui/material';
import { Delete } from '@mui/icons-material';

export const CreatePost = ({ editPostData, onEditSuccessfull = () => null }) => {
  const localUser = retrieveUser();
  const [postLoading, setpostLoading] = useState(false);
  const [postContent, setPostContent] = useState(null);
  const [externalLink, setExternalLink] = useState(null);
  const [previewSrc, setPreviewSrc] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, apiCall: apiCallForImage } = useApiHook({
    method: 'post',
    call: imageUploadBlobStorageUrl,
  });

  useEffect(() => {
    if (editPostData?.id) {
      setPreviewSrc(editPostData?.imageURL);
      setPostContent(editPostData?.description);
      setExternalLink(editPostData?.externalLink);
      setIsEdit(true);
    }
  }, [editPostData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file.size > imageSize) {
      dispatch(onOpenAlertAction({ message: 'Image size should not be greater than 5mb', type: 'error' }));
      return;
    }
    let formData = new FormData();

    formData.append('blob', file);
    apiCallForImage(formData).then((res) => {
      setPreviewSrc((img) => [...img, res]);
    });
  };

  const onCreatePost = (e) => {
    setpostLoading(true);
    e.preventDefault();
    if (previewSrc.length > 0 && postContent.length > 0) {
      const data = {
        imageURL: previewSrc,
        description: postContent,
        externalLink,
        userId: localUser?.id,
        date: moment().format(shiftFormat),
        likes: 0,
      };
      if (isEdit) {
        updatePost({ postId: editPostData?.id, imageURL: previewSrc, description: postContent, externalLink })
          .then(() => {
            onEditSuccessfull();
            setpostLoading(false);
            console.log('success');
          })
          .catch((e) => {
            dispatch(onOpenAlertAction({ type: 'error', message: e }));
            setpostLoading(false);
            console.log({ e });
          });
      } else {
        userPost(data)
          .then(() => {
            navigate(MAIN_ROUTE);
            setpostLoading(false);
          })
          .catch((e) => {
            dispatch(onOpenAlertAction({ type: 'error', message: e }));
            setpostLoading(false);
          });
      }
    }
  };

  const onRemoveImage = (i) => {
    setPreviewSrc((img) => img.filter((item, index) => index !== i));
  };

  return (
    <div>
      {/* create post */}
      <div class="bg-gray-100 h-screen flex items-center justify-center">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={onCreatePost}>
            {previewSrc.length > 0 && (
              <Slide autoplay={false} infinite={false} arrows={false} transitionDuration={100}>
                <div className="flex overflow-x-auto gap-2">
                  {previewSrc?.map((item, i) => (
                    <>
                      <img
                        className={`w-full min-w-full h-[200px] ml-[${i > 0 ? '20px' : '0px'}]`}
                        src={item}
                        key={i}
                        alt={'img'}
                      />
                      <div className="ml-[-40px] mt-[10px] p-2 w-[20px] h-[20px] bg-[rgba(0,0,0,0.8)] rounded-full flex items-center justify-center">
                        <Delete onClick={() => onRemoveImage(i)} className="text-white  shadow-2xl text-[12px]" />
                      </div>
                    </>
                  ))}
                </div>
              </Slide>
            )}

            {isLoading ? (
              <div class="mb-6 mt-2 relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-center transition duration-150 ease-in-out">
                <CircularProgress color="error" />
              </div>
            ) : (
              <div class="mb-6 mt-2">
                <div class="relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between transition duration-150 ease-in-out">
                  <input
                    type="file"
                    id="fileAttachment"
                    name="fileAttachment"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg"
                  />
                  <div class="flex items-center ">
                    <svg
                      class="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span class="ml-2 text-sm text-gray-600">Choose an image</span>
                  </div>
                  <span class="text-sm text-gray-500">Max file size: 5MB</span>
                </div>
              </div>
            )}
            <div class="mb-6">
              <label for="postContent" class="block text-gray-700 text-sm font-bold mb-2">
                Post Content:
              </label>
              <textarea
                id="postContent"
                name="postContent"
                rows="4"
                class="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                placeholder="What's on your mind?"
                onChange={(e) => setPostContent(e.target.value)}
                value={postContent}
              ></textarea>
              <span class="text-gray-500 text-sm">Max 280 characters</span>
            </div>

            <div class="mb-6">
              <label for="externalLink" class="block text-gray-700 text-sm font-bold mb-2">
                Your Product Link:
              </label>
              <textarea
                id="externalLink"
                name="externalLink"
                rows="2"
                class="w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm
          sm:leading-5 resize-none focus:outline-none focus:border-blue-500"
                placeholder=""
                onChange={(e) => setExternalLink(e.target.value)}
                value={externalLink}
              ></textarea>
            </div>

            <div class="flex items-center justify-center">
              {postLoading ? (
                <CircularProgress color="error" />
              ) : (
                <button
                  type="submit"
                  class={`flex justify-center items-center bg-[${primaryColor}] focus:outline-none focus:shadow-outline-blue text-black py-2 px-4 rounded-md transition duration-300 gap-2`}
                >
                  {' '}
                  {!isEdit ? 'Post' : 'Update Post'}{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    id="send"
                    fill="#000"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                  </svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      {/* create post end */}
    </div>
  );
};
