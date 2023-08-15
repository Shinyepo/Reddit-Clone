"use client";
import { ThreadComment } from "@/components/threadComment";
import { ThreadFooter } from "@/components/threadFooter";
import { ThreadLikes } from "@/components/threadLikes";
import { useToast } from "@/toast";
import { formatTimeAgo } from "@/utils/relativeTime";
import { useEffect, useRef, useState } from "react";
import Loading from "./loading";
import "./page.css";
import { FullPost } from "@/types/types";
import { signIn, useSession } from "next-auth/react";
import { ThreadCreateComment } from "@/components/threadCreateComment";

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
  const session = useSession();
  const [thread, setThread] = useState<FullPost>();
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

  let body = <Loading />;
  let comments = <Loading />;

  if (thread) {
    body = (
      <div className="item1 thread-content">
        <ThreadLikes />
        <div className="thread-header">
          <div data-testid="thread-author" className="thread-author">
            Created by {thread.author?.username!} -{" "}
            {formatTimeAgo(thread.createdAt)}
          </div>
          <h1 data-testid="thread-title">{thread.title}</h1>
        </div>
        <div data-testid="thread-content" className="thread-main">
          {thread.content}
        </div>
        <ThreadFooter
          id={params.slug}
          showing={showShare}
          setShowing={setShowShare}
        />
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
          {session.status === "authenticated" ? (
            <ThreadCreateComment
              commentRef={commentRef}
              setThread={setThread}
              slug={params.slug}
              thread={thread}
            />
          ) : (
            <div className="thread-create-comment-auth" onClick={async () => await signIn()}>
              Sign in to create a comment
            </div>
          )}
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
