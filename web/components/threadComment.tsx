"use client";
import { Comment, User } from "@prisma/client";
import { FC } from "react";
import "./threadComment.css";
import { formatTimeAgo } from "../utils/relativeTime";
import { ThreadLikes } from "./threadLikes";

interface Props {
  comment: Comment;
  author: User | null;
  count?: string;
}

export const ThreadComment: FC<Props> = ({ author, comment, count }) => {
  const { content, createdAt, updatedAt } = comment;
  

  return (
    <div className="thread-comment">
      <div data-testid="comment-author" className="thread-author">
        <div data-testid="comment-avatar" className="comment-avatar"></div>
        created by {author?.username!} - {formatTimeAgo(createdAt)}{" "}
        <span data-testid="comment-edited">
          {new Date(createdAt).getTime() === new Date(updatedAt).getTime()
            ? null
            : "- edited " + formatTimeAgo(updatedAt)}
        </span>
      </div>
      <div data-testid="comment-content" className="comment-content">
        {content}
      </div>
      <div data-testid="comment-footer" className="comment-footer">
        <div data-testid="comment-likes" className="comment-likes">
          <ThreadLikes
            postId={comment.postId.toString()}
            commentId={comment.id.toString()}
            count={count ?? "0"}
          />
        </div>
        <div className="comment-reply">REPLY</div>
        <div className="comment-report">REPORT</div>
      </div>
    </div>
  );
};
