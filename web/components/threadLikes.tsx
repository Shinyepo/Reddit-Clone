import Image from "next/image";
import { FC } from "react";
import "./threadLikes.css";

interface Props {}

export const ThreadLikes: FC<Props> = () => {
  return (
    <div data-testid="thread-likes" className="thread-likes">
      <Image src="/like.svg" alt="like button" width={48} height={48} />
      <div data-testid="like-count" className="likes-count">9999</div>
      <Image
        className="dislike"
        src="/like.svg"
        alt="dislike button"
        width={48}
        height={48}
      />
    </div>
  );
};
