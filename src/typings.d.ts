import { Session } from '@supabase/supabase-js';

interface IPost {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  author_id: string;
  post_likes: number;
  created_at: Date;
  id?: string;
}

interface IFullPost extends IPost {
  user: { username: string };
}

interface IPostSearchItem {
  title: string;
  id: string;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  created_at: Date;
}
