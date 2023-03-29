"use client";
import "./threadPreview.css";
import { FC } from "react";
import { ThreadLikes } from "./threadLikes";
import { useRouter } from "next/navigation";
import { ThreadFooter } from "./threadFooter";

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

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];
const formatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});
function formatTimeAgo(date: Date) {
  const curr = new Date().getTime();
  const old = new Date(date).getTime();
  let duration = (old - curr) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      // eslint-disable-next-line $rulename
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
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
          <h2>{title.slice(0, 120)}</h2>
        </div>
        <div data-testid="thread-content" className="preview-content">
          {content.slice(0, 240)}
        </div>
      </div>
      <ThreadFooter />
    </div>
  );
};
