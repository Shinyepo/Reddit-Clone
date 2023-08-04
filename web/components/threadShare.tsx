import "./threadShare.css";
import { FC } from "react";

interface Props {
  onClose: () => void;
  link: string;
}

export const ThreadShare: FC<Props> = ({ link }) => {
  console.log("dick " + link);

  return (
    <div className="thread-share-modal" onClick={(e) => e.stopPropagation()}>
      <div>Share this thread with the world!</div>
      <div>{link}</div>
    </div>
  );
};
