import { useEffect } from 'react';

const useTitle = (title: string | undefined | null) => {
  useEffect(() => {
    if (!title) return;
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, []);
};

export default useTitle;
