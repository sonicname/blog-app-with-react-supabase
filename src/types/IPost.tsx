export interface IPost {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  author_id: string;
  post_likes: number;
  created_at: Date;
  id?: string;
}

export interface IFullPost extends IPost {
  user: { username: string };
}

export interface IPostSearchItem {
  title: string;
  id: string;
}
