export interface IPost {
  title: string;
  thumbnail: string;
  content: string;
  author_id: string;
  description: string;
  id?: string;
  slug?: string;
  post_likes: number;
  created_at: Date;

  user: { username: string };
}
