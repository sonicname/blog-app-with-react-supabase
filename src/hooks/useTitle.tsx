import { useEffect } from 'react';

const useTitle = (title: string | undefined | null) => {
  useEffect(() => {
    console.log(
      '🚀 ~ file: useTitle.tsx ~ line 8 ~ useEffect ~ title',
      title,
    );
    if (!title) return;
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, []);
};

export default useTitle;
