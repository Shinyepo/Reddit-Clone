import { Comment, Post, User } from "@prisma/client";

export interface FullPost extends Post {
  author: User | null;
  comments: CommentWithAuthor[] | null;
}

export interface CommentWithAuthor extends Comment {
  author: User | null;
}
