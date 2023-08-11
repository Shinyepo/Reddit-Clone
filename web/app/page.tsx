"use client";
import Loading from "../app/loading";
import { ThreadPreview } from "@/components/threadPreview";
import { useToast } from "@/toast";
import { Post, User } from "@prisma/client";
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
  const data = json.posts as (Post & { author: User | null })[];
  return {
    response: "ok",
    data,
  };
};

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<(Post & { author: User | null })[]>(
    new Array()
  );
  const [title, setTitle] = useState<string>("");
  const [showShare, setShowShare] = useState<Boolean>(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const getData = await getPosts();
      if (getData.response !== "ok") {
        return toast.open({ type: "error", message: "Could not load posts." });
      }
      setPosts(getData.data);
    })();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="threads" role="article">
        <div className="new-thread-container">
          <div data-testid="new-avatar" className="user-avatar"></div>
          <div
            data-testid="input-redirect"
            className="fake-input"
          >
            <input
              type="text"
              placeholder="Create new thread"
              onChange={handleChange}
            />
            <button
              className="create-thread"
              onClick={() => router.push("/submit" + (title !== "" ? "?title=" + title : ""))}
            >Create</button>
          </div>
        </div>
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <ThreadPreview
                key={post.id}
                id={post.id}
                author={post.author!.username!}
                title={post.title}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                createdAt={post.createdAt}
                show={showShare}
                setShow={setShowShare}
              />
            );
          })
        ) : (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
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
