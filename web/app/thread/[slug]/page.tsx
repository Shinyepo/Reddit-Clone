"use client";
import { ThreadComment } from "@/components/threadComment";
import { ThreadFooter } from "@/components/threadFooter";
import { ThreadLikes } from "@/components/threadLikes";
import { useToast } from "@/toast";
import { formatTimeAgo } from "@/utils/relativeTime";
import { Post, User, Comment } from "@prisma/client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Loading from "./loading";
import "./page.css";
import { useRouter } from "next/navigation";

interface FullPost extends Post {
  author: User | null;
  comments: CommentWithAuthor[] | null;
}

interface CommentWithAuthor extends Comment {
  author: User | null;
}

const getData = async (id: string) => {
  const res = await fetch("/api/thread/" + id);
  if (!res.ok) {
    return {
      response: "error",
      data: {} as FullPost,
    };
  }

  const json = await res.json();
  const thread = json.thread as FullPost;

  return {
    response: "ok",
    data: thread,
  };
};

export default function Home({ params }: { params: { slug: string } }) {
  const [thread, setThread] = useState<FullPost>();
  const [comment, setComment] = useState<string>("");
  const commentRef = useRef<HTMLDivElement | null>(null);
  const [showShare, setShowShare] = useState<Boolean>(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const res = await getData(params.slug);
      if (res.response !== "ok") {
        return toast.open({ type: "error", message: "Could not load thread" });
      }
      setThread(res.data);
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      thread: params.slug,
      content: comment,
    };

    if (comment === "") {
      toast.open({ type: "error", message: "Comment cannot be empty." });
      return;
    }

    const json = JSON.stringify(data);
    const req = await fetch("/api/thread/" + params.slug, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status === 200) {
      const jsonData = await req.json();
      const data = jsonData.comment as CommentWithAuthor;
      setThread((prev): FullPost => {
        return {
          ...prev!,
          comments: [data, ...prev!.comments!],
        } as FullPost;
      });
      setComment("");
      commentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      return toast.open({ type: "success", message: "Created new comment." });
    }
    return toast.open({ type: "error", message: "Something went wrong." });
  };

  let body = <Loading />;
  let comments = <Loading />;

  if (thread) {
    body = (
      <div className="item1 thread-content">
        <ThreadLikes />
        <div className="thread-header">
          <div data-testid="thread-author" className="thread-author">
            Created by {thread.author?.name!} -{" "}
            {formatTimeAgo(thread.createdAt)}
          </div>
          <h1 data-testid="thread-title">{thread.title}</h1>
        </div>
        <div data-testid="thread-content" className="thread-main">
          {thread.content}
        </div>
        <ThreadFooter id={params.slug} showing={showShare} setShowing={setShowShare} />
      </div>
    );

    comments = (
      <>
        {thread.comments && thread.comments.length > 0 ? (
          thread.comments!.map((x, idx) => {
            return <ThreadComment key={idx} author={x.author} comment={x} />;
          })
        ) : (
          <div className="no-comments">No Comments...</div>
        )}
      </>
    );
  }

  return (
    <div className="thread-container">
      <div className="thread-grid">
        {body}
        <div className="item2 thread-create-comment">
          <div className="new-comment">
            <form
              data-testid="new-comment-field"
              onSubmit={handleSubmit}
              className="new-comment-field"
            >
              <p>Write a new comment</p>
              <textarea
                className="comment-field"
                name="newComment"
                id="newComment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                disabled={!!!thread}
              />
              <button
                type="submit"
                disabled={!!!thread}
                className="submit-comment"
              >
                Comment
              </button>
            </form>
          </div>
        </div>
        <div className="item3">
          <div className="scroll-hook" ref={commentRef}></div>
          <div data-testid="comment-section" className="thread-comments">
            {comments}
          </div>
        </div>
      </div>
    </div>
  );
}
