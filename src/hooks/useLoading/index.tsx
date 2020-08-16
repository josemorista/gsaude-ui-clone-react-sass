import {useState, useCallback} from 'react';
export const useLoading = (initialState: boolean) => {
  const [loading, setLoading] = useState(initialState);

  const updateLoading = useCallback((loadingState: boolean) => {
    setLoading(loadingState);
  }, []);

  return {loading, setLoading: updateLoading};
};