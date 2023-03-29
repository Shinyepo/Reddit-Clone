"use client";
import { useToast } from "@/toast";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import "./page.css";

export default function Home() {
  const toast = useToast();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, content } = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
    };

    const data = {
      title: title.value,
      content: content.value,
    };

    const jsonData = JSON.stringify(data);
    const res = await fetch("/api/posts", {
      body: jsonData,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      toast.open({ type: "success", message: "You created a new post."});
      return router.push("/");
    }
  };
  return (
    <div data-testid="new-thread" className="new-thread">
      <form onSubmit={handleSubmit} className="edit-container">
        <div data-testid="new-author" className="new-author">
          <div className="new-avatar"></div>
          ########
        </div>
        <div className="new-title">
          Title:
          <input
            data-testid="new-title"
            type="text"
            id="title"
            name="title"
            className="new-thread-title"
            placeholder="Thread title..."
          />
        </div>
        <div className="new-content">
          Content:
          <textarea
            data-testid="new-content"
            id="content"
            className="content-field"
            name="content"
          />
        </div>
        <div data-testid="new-submit" className="new-submit">
          <button type="submit" className="submit-thread">
            Submit
          </button>
        </div>
      </form>
      <div className="info-container"></div>
      {/* <Toast message="debil" title="dddd" type="info" /> */}
    </div>
  );
}
