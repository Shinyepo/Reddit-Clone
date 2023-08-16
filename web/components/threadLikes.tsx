"use client";
import Image from "next/image";
import { FC, MouseEvent, useState } from "react";
import "./threadLikes.css";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
  commentId?: string;
  count: string;
}

const ToggleLike = async (
  userId: string,
  postId: string,
  like: boolean,
  commentId?: string
) => {
  const data = {
    userId,
    postId,
    like,
    commentId,
  };

  const res = await fetch("/api/like", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res || !res.ok)
    return {
      data: null,
      ok: false,
    };
  const resData = (await res.json()) as { created: boolean; message: string };

  return {
    data: resData.created,
    ok: true,
  };
};

export const ThreadLikes: FC<Props> = ({ postId, commentId, count }) => {
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
      const res = await ToggleLike(
        session.data.user!.id,
        postId,
        false,
        commentId
      );
      if (!res.ok) return setLoading(false);
      if (res.data) setLikes((newCount - 1).toString());
      else setLikes((newCount - 2).toString());
    } else {
      const res = await ToggleLike(
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
