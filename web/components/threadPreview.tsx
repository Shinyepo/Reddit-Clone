"use client";
import "./threadPreview.css";
import { Dispatch, FC, SetStateAction } from "react";
import { ThreadLikes } from "./threadLikes";
import { useRouter } from "next/navigation";
import { ThreadFooter } from "./threadFooter";
import { formatTimeAgo } from "@/utils/relativeTime";

// TODO: make the footer buttons into divs and add onClick events
// TODO: make the like and dislike button clickable with onClick event

interface Props {
  id: string;
  author: string;
  title: string;
  content: string;
  count?: string;
  createdAt: Date;
  show: Boolean;
  setShow: Dispatch<SetStateAction<Boolean>>;
}

export const ThreadPreview: FC<Props> = ({
  id,
  author,
  title,
  content,
  createdAt,
  show,
  setShow,
  count,
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
      <div data-testid="thread-likes" className="thread-likes">
        <ThreadLikes postId={id} count={count ?? "0"} />
      </div>
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
      <ThreadFooter id={id.toString()} showing={show} setShowing={setShow} />
    </div>
  );
};
