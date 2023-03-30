"use client";
import "./threadPreview.css";
import { FC } from "react";
import { ThreadLikes } from "./threadLikes";
import { useRouter } from "next/navigation";
import { ThreadFooter } from "./threadFooter";
import { formatTimeAgo } from "@/utils/relativeTime";

// TODO: make the footer buttons into divs and add onClick events
// TODO: make the like and dislike button clickable with onClick event

interface Props {
  id: number;
  author: string;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export const ThreadPreview: FC<Props> = ({
  id,
  author,
  title,
  content,
  createdAt,
  dislikes,
  likes,
}) => {
  const router = useRouter();

  return (
    <div
      role="link"
      className="preview-container"
      onClick={(e) => {
        e.preventDefault();
        router.push("/thread/" + id);
      }}
    >
      <ThreadLikes />
      <div className="thread-data">
        <div data-testid="thread-author" className="preview-author">
          created by {author} - {formatTimeAgo(createdAt)}
        </div>
        <div data-testid="thread-title" className="preview-title">
          <h2>{title.length > 120 ? title.slice(0, 120) + "..." : title}</h2>
        </div>
        <div data-testid="thread-content" className="preview-content">
          {content.length > 360 ? content.slice(0, 360) + "..." : content}
        </div>
      </div>
      <ThreadFooter />
    </div>
  );
};
