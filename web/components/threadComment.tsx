"use client";
import { formatTimeAgo } from "@/utils/relativeTime";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import "./threadComment.css";

interface Props {
  comment: Comment;
  author: User | null;
}

export const ThreadComment: FC<Props> = ({ author, comment }) => {
  const [likesCount, setLikesCount] = useState(0);
  const { content, createdAt, dislikes, likes, updatedAt } = comment;

  useEffect(() => {
    setLikesCount(likes - dislikes);
  }, []);

  return (
    <div className="thread-comment">
      <div data-testid="comment-author" className="thread-author">
        <div data-testid="comment-avatar" className="comment-avatar"></div>
        created by {author?.name!} - {formatTimeAgo(createdAt)}{" "}
        {createdAt === updatedAt
          ? null
          : "- edited " + formatTimeAgo(updatedAt)}
      </div>
      <div data-testid="comment-content" className="comment-content">
        {content}
      </div>
      <div data-testid="comment-footer" className="comment-footer">
        <div data-testid="comment-likes" className="comment-likes">
          <Image
            src="/like.svg"
            alt="like button"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setLikesCount(likes + 1);
            }}
          />
          {likes}
          <Image
            className="dislike"
            src="/like.svg"
            alt="dislike button"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setLikesCount(likes - 1);
            }}
          />
        </div>
        <div className="comment-reply">REPLY</div>
        <div className="comment-report">REPORT</div>
      </div>
    </div>
  );
};
