import { Comment, Likes, Post, User } from "@prisma/client";

export interface FullPost extends Post {
  author: User | null;
  comments: CommentWithAuthor[] | null;
  Likes: Likes[];
}

export interface CommentWithAuthor extends Comment {
  author: User | null;
  Likes: Likes[] | null;
}
