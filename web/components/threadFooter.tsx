import Image from "next/image";
import "./threadFooter.css";
import { Dispatch, FC, MouseEvent, SetStateAction, useState } from "react";
import { ThreadShare } from "./threadShare";
import { createPortal } from "react-dom";

interface Props {
  id: string;
  showing: Boolean;
  setShowing: Dispatch<SetStateAction<Boolean>>;
}

export const ThreadFooter: FC<Props> = ({ id, showing, setShowing }) => {
  const [showShare, setShowShare] = useState<Boolean>(false);
  const link = window.location.href + "/thread/" + id;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (showing) return;
    setShowing(true);
    setShowShare(true);
    return;
  };

  const handleShow = () => {
    setShowing(false);
    setShowShare(false);
  }
  return (
    <div data-testid="thread-footer" className="thread-footer">
      <div className="thread-footer-button">
        <Image alt="comment" src="/comment.svg" width={24} height={24} />
        <p>Comment</p>
      </div>
      <div className="thread-footer-button">
        <Image alt="favourite" src="/favourite.svg" width={24} height={24} />
        <p>Favourite</p>
      </div>
      <div className="thread-footer-button" onClick={handleClick}>
        <Image alt="share" src="/share.svg" width={24} height={24} />
        <p>Share</p>
      </div>
      {showShare &&
        createPortal(
          <ThreadShare onClose={() => handleShow()} link={link} />,
          document.body
        )}
    </div>
  );
};
