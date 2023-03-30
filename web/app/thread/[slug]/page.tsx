"use client";
import { ThreadComment } from "@/components/threadComment";
import { ThreadFooter } from "@/components/threadFooter";
import { ThreadLikes } from "@/components/threadLikes";
import { useToast } from "@/toast";
import { formatTimeAgo } from "@/utils/relativeTime";
import { Post, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Loading from "./loading";
import "./page.css";

interface FullPost extends Post {
  author: User | null;
  comments: Comment[] | null;
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
        <ThreadFooter />
      </div>
    );
    comments = (
      <>
        <ThreadComment />
        <ThreadComment />
        <ThreadComment />
      </>
    );
  }

  return (
    <div className="thread-container">
      <div className="thread-grid">
        {body}
        <div className="item2 thread-create-comment">
          <div className="new-comment">
            <div data-testid="new-comment-field" className="new-comment-field">
              <p>Write a new comment</p>
              <textarea className="comment-field" name="newComment" />
              <button type="submit" className="submit-comment">
                Comment
              </button>
            </div>
          </div>
        </div>
        <div className="item3">
          <div data-testid="comment-section" className="thread-comments">
            {comments}
          </div>
        </div>
      </div>
    </div>
  );
}
