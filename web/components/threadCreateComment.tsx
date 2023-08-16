import { useToast } from "@/toast";
import { CommentWithAuthor, FullPost } from "@/types/types";
import {
  Dispatch,
  FC,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  useState,
} from "react";

interface Props {
  thread: FullPost | undefined;
  setThread: Dispatch<SetStateAction<FullPost | undefined>>;
  commentRef: MutableRefObject<HTMLDivElement | null>;
  slug: string;
}

export const ThreadCreateComment: FC<Props> = ({
  setThread,
  commentRef,
  slug,
  thread
}) => {
  const [comment, setComment] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      thread: slug,
      content: comment,
    };

    if (comment === "") {
      toast.open({ type: "error", message: "Comment cannot be empty." });
      return;
    }

    const json = JSON.stringify(data);
    const req = await fetch("/api/thread/" + slug, {
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
        const returnData = {
          ...prev!,
          comments: [data, ...prev!.comments!],
        } as FullPost;
        
        return returnData;
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
  return (
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
        <button type="submit" disabled={!!!thread} className="submit-comment">
          Comment
        </button>
      </form>
    </div>
  );
};
