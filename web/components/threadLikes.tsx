"use client";
import Image from "next/image";
import { FC, useState } from "react";
import "./threadLikes.css";

interface Props {}

export const ThreadLikes: FC<Props> = () => {
  const [likes, setLikes] = useState(0);
  return (
    <div data-testid="thread-likes" className="thread-likes">
      <Image
        src="/like.svg"
        alt="like button"
        width={48}
        height={48}
        onClick={(e) => {e.stopPropagation(); setLikes(likes + 1)}}
      />
      <div data-testid="like-count" className="likes-count">
        {likes}
      </div>
      <Image
        className="dislike"
        src="/like.svg"
        alt="dislike button"
        width={48}
        height={48}
        onClick={(e) => {e.stopPropagation(); setLikes(likes - 1)}}
      />
    </div>
  );
};
