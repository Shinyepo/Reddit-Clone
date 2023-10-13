"use client";
import Image from "next/image";
import { FC, MouseEvent, useState } from "react";
import "./threadLikes.css";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
  commentId?: string;
  count: string;
  fetchData: (
    userId: string,
    postId: string,
    like: boolean,
    commentId?: string
  ) => Promise<
    | {
        data: null;
        ok: boolean;
      }
    | {
        data: boolean;
        ok: boolean;
      }
  >;
}

export const ThreadLikes: FC<Props> = ({ postId, commentId, count, fetchData }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [likes, setLikes] = useState<string>(count);
  const session = useSession();

  const handleClick = async (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    if (session.status !== "authenticated") return;
    if (loading) return;
    setLoading(true);
    const newCount = parseInt(likes);
    if (e.currentTarget.classList.contains("dislike")) {
      const res = await fetchData(
        session.data.user!.id,
        postId,
        false,
        commentId
      );
      if (!res.ok) return setLoading(false);
      if (res.data) setLikes((newCount - 1).toString());
      else setLikes((newCount - 2).toString());
    } else {
      const res = await fetchData(
        session.data.user!.id,
        postId,
        true,
        commentId
      );
      if (!res.ok) return setLoading(false);
      if (res.data) setLikes((newCount + 1).toString());
      else setLikes((newCount + 2).toString());
    }
    setLoading(false);
  };

  return (
    <>
      <Image
        className="like"
        src="/like.svg"
        alt="like button"
        width={commentId ? 24 : 48}
        height={commentId ? 24 : 48}
        onClick={handleClick}
      />
      <div data-testid="like-count" className="likes-count">
        {likes}
      </div>
      <Image
        className="dislike"
        src="/like.svg"
        alt="dislike button"
        width={commentId ? 24 : 48}
        height={commentId ? 24 : 48}
        onClick={handleClick}
      />
    </>
  );
};
