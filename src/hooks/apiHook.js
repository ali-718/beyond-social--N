import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { client, errorModifier } from 'src/config/client';
import { onOpenAlertAction } from 'src/redux/AlertRedux';

export const useApiHook = ({ method = 'get', call, contentType }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState(null);
  const [isError, setIsError] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState('');

  const apiCall = async (data, apiCall) => {
    setIsLoading(true);

    try {
      const res = await client?.[method](apiCall || call, data);
      setdata(res.data.data);
      setIsError(res.data.isSuccess);
      setError(res.data.message);
      setPageCount(res.data?.totalPages);
      setTotalCount(res.data?.totalCount);
      setIsLoading(false);
      return Promise.resolve(res.data.data);
    } catch (e) {
      console.log({ e });
      setIsLoading(false);
      setIsError(true);
      setError(errorModifier(e));
      dispatch(onOpenAlertAction({ message: errorModifier(e), type: 'error' }));
      return Promise.reject(errorModifier(e));
    }
  };

  return { isLoading, data, isError, error, apiCall, pageCount, totalCount };
};
