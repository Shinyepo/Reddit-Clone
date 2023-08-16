"use client";
import Loading from "../app/loading";
import { ThreadPreview } from "@/components/threadPreview";
import { useToast } from "@/toast";
import { Likes, Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import "./page.css";

const getPosts = async () => {
  const res = await fetch("/api/posts");
  if (!res.ok) {
    return {
      response: "error",
      data: [],
    };
  }
  const json = await res.json();
  const data = json.posts as (Post & { author: User | null } & {
    Likes: Likes[] | null;
  })[];
  return {
    response: "ok",
    data,
  };
};

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<
    (Post & { author: User | null } & { Likes: Likes[] | null })[]
  >(new Array());
  const [dataStatus, setDataStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [title, setTitle] = useState<string>("");
  const [showShare, setShowShare] = useState<Boolean>(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const getData = await getPosts();
      if (getData.response !== "ok") {
        setDataStatus("error");
        return toast.open({ type: "error", message: "Could not load posts." });
      }
      setPosts(getData.data);
      setDataStatus("success");
    })();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  let body = <Loading />;

  if (dataStatus === "success") {
    if (posts.length > 0) {
      body = (
        <>
          {posts.map((post) => {
            const likes = post.Likes?.filter(
              (x) => x.postId === post.id && x.commentId === null
            );
            const count = likes?.reduce((n, x) => (x.like ? n + 1 : n - 1), 0);

            return (
              <ThreadPreview
                key={post.id}
                id={post.id.toString()}
                author={post.author!.username!}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                show={showShare}
                setShow={setShowShare}
                count={count?.toString() ?? "0"}
              />
            );
          })}
        </>
      );
    } else {
      body = <div>No Posts</div>;
    }
  }

  return (
    <div className="main-container">
      <div className="threads" role="article">
        <div className="new-thread-container">
          <div data-testid="new-avatar" className="user-avatar"></div>
          <div data-testid="input-redirect" className="fake-input">
            <input
              type="text"
              placeholder="Create new thread"
              onChange={handleChange}
            />
            <button
              className="create-thread"
              onClick={() =>
                router.push("/submit" + (title !== "" ? "?title=" + title : ""))
              }
            >
              Create
            </button>
          </div>
        </div>
        {body}
      </div>
      <div data-testid="sidebar" className="sidebar">
        <div data-testid="about" className="about">
          <div className="about-header" role="heading">
            A header for about section
          </div>
          <div className="about-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            consectetur illo molestiae minima nesciunt dolores, ea adipisci
            maxime eius, nulla blanditiis earum. Necessitatibus quam adipisci
            ducimus possimus ab animi dolorem?
          </div>
        </div>
      </div>
    </div>
  );
}
