import "./threadPreview.css";
import { FC } from "react";
import Image from "next/image";

// TODO: make the footer buttons into divs and add onClick events
// TODO: make the like and dislike button clickable with onClick event

interface Props {}
export const ThreadPreview: FC<Props> = () => {
  return (
    <div className="thread-container">
      <div className="item1 thread-likes">
        <Image src="/like.svg" alt="like button" width={48} height={48} />
        <div className="likes-count">9999</div>
        <Image
          className="dislike"
          src="/like.svg"
          alt="dislike button"
          width={48}
          height={48}
        />
      </div>
      <div className="item2 thread-data">
        <div className="thread-author">
          created by ########### - 123 days ago
        </div>
        <div className="thread-title">
          <h2>
            Fancy thread title for testing purposes. Lets make it a bit longer
            to see how it behaves.
          </h2>
        </div>
        <div className="thread-content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus
          voluptate eveniet sed aut totam itaque non officiis similique enim
          officia commodi doloribus magnam, incidunt dolore repudiandae
          inventore nesciunt est. Blanditiis.
        </div>
      </div>
      <div className="item3 thread-footer">
          <Image alt="comment" src="/comment.svg" width={24} height={24} />
          <p>Comment</p>
          <Image alt="favourite" src="/favourite.svg" width={24} height={24} />
          <p>Favourite</p>
          <Image alt="share" src="/share.svg" width={24} height={24} />
          <p>Share</p>
      </div>
    </div>
  );
};
