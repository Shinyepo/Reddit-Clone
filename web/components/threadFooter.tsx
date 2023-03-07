import Image from "next/image";
import "./threadFooter.css"

export const ThreadFooter = () => {
  return (
    <div data-testid="thread-footer" className="thread-footer">
      <Image alt="comment" src="/comment.svg" width={24} height={24} />
      <p>Comment</p>
      <Image alt="favourite" src="/favourite.svg" width={24} height={24} />
      <p>Favourite</p>
      <Image alt="share" src="/share.svg" width={24} height={24} />
      <p>Share</p>
    </div>
  );
};
