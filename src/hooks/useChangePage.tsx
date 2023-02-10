import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import useQuery from './useQuery';

const useChangePage = (slug: string = '', limit?: number) => {
  const query = useQuery();
  const navigate = useNavigate();

  const pageQuery = query.get('page');

  const page = pageQuery ? parseInt(pageQuery) : 1;

  const changePage = useCallback(
    (pageToChange: number) => navigate(`${slug}?page=${pageToChange}`),
    [slug, limit],
  );

  return { page, changePage, limit };
};

export default useChangePage;
