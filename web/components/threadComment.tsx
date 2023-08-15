"use client";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import "./threadComment.css";
import { formatTimeAgo } from "../utils/relativeTime";

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
  console.log(comment.createdAt);
  
  return (
    <div className="thread-comment">
      <div data-testid="comment-author" className="thread-author">
        <div data-testid="comment-avatar" className="comment-avatar"></div>
        created by {author?.username!} - {formatTimeAgo(createdAt)}{" "}
        <span data-testid="comment-edited">
          {(new Date(createdAt)).getTime() === (new Date(updatedAt)).getTime()
            ? null
            : "- edited " + formatTimeAgo(updatedAt)}
        </span>
      </div>
      <div data-testid="comment-content" className="comment-content">
        {content}
      </div>
      <div data-testid="comment-footer" className="comment-footer">
        <div data-testid="comment-likes" className="comment-likes">
          <Image
            className="like"
            src="/like.svg"
            alt="like button"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setLikesCount(likesCount + 1);
            }}
          />
          <span data-testid="likes-counter">{likesCount}</span>
          <Image
            className="dislike"
            src="/like.svg"
            alt="dislike button"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setLikesCount(likesCount - 1);
            }}
          />
        </div>
        <div className="comment-reply">REPLY</div>
        <div className="comment-report">REPORT</div>
      </div>
    </div>
  );
};
