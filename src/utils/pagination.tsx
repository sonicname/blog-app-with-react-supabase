export default function pagination(page: number, limit: number) {
  return {
    FROM: page > 1 ? (page - 1) * limit + 1 : (page - 1) * limit,
    LIMIT: page === 1 ? page * limit : limit * page + 1,
  };
}
