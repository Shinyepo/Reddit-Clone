import { useToast } from "@/toast";
import "./threadShare.css";
import { FC, MouseEvent } from "react";
import Image from "next/image";

interface Props {
  onClose: () => void;
  link: string;
}

export const ThreadShare: FC<Props> = ({ link, onClose }) => {
  const toast = useToast();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="thread-share-bg" onClick={handleClick}>
      <div className="thread-share-modal">
        <div className="thread-share-close" onClick={handleClick}>
          X
        </div>
        <div className="thread-share-header">
          Share this thread with the world!
        </div>
        <div className="thread-share-link">
          <input
            className="search-field thread-share-input"
            type="text"
            onClick={(e) => e.currentTarget.select()}
            readOnly={true}
            value={link}
          />
          <div
            className="thread-share-copy"
            onClick={async () => {
              await navigator.clipboard.writeText(link);
              return toast.open({
                message: "Coppied to clipboard!",
                type: "success",
              });
            }}
          >
            <Image
              className="thread-share-copy-img"
              alt="copy"
              src="/copy.svg"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
