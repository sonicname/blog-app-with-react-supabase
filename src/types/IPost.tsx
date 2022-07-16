export interface IPost {
  title: string;
  thumbnail: string;
  content: string;
  author_id: string;
  description: string;
  id?: string;
  slug?: string;

  user: { username: string };
}
