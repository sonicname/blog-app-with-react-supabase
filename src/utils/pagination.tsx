export default function pagination(page: number, limit: number) {
  const FROM = page > 1 ? (page - 1) * limit + 1 : (page - 1) * limit;
  const LIMIT = page === 1 ? page * limit : limit * page + 1;

  return {
    FROM,
    LIMIT,
  };
}
