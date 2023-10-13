
export const ToggleLike = async (
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
