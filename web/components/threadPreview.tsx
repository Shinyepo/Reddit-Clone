"use client";
import "./threadPreview.css";
import { FC } from "react";
import { ThreadLikes } from "./threadLikes";
import { useRouter } from "next/navigation";
import { ThreadFooter } from "./threadFooter";

// TODO: make the footer buttons into divs and add onClick events
// TODO: make the like and dislike button clickable with onClick event

interface Props {}
export const ThreadPreview: FC<Props> = () => {
  const router = useRouter();
  return (
    <div role="link" className="preview-container" onClick={() => router.push("/thread")}>
      <ThreadLikes />
      <div className="thread-data">
        <div data-testid="thread-author" className="preview-author">
          created by ########### - 123 days ago
        </div>
        <div data-testid="thread-title" className="preview-title">
          <h2>
            Fancy thread title for testing purposes. Lets make it a bit longer
            to see how it behaves.
          </h2>
        </div>
        <div data-testid="thread-content" className="preview-content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
          voluptate eveniet sed aut totam itaque non officiis similique enim
          officia commodi doloribus magnam, incidunt dolore repudiandae
          inventore nesciunt est. Blanditiis.
        </div>
      </div>
        <ThreadFooter />
    </div>
  );
};
