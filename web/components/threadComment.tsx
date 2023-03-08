"use client";
import Image from "next/image";
import { FC, useState } from "react";
import "./threadComment.css";

interface Props {}

export const ThreadComment: FC<Props> = () => {
  const [likes, setLikes] = useState(0);

  return (
    <div className="thread-comment">
      <div data-testid="comment-author" className="thread-author">
        <div data-testid="comment-avatar" className="comment-avatar"></div>
        ########### - 123 days ago</div>
      <div data-testid="comment-content" className="comment-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sunt
        rerum illo blanditiis. Deleniti nihil ipsa, velit necessitatibus natus,
        veritatis suscipit laborum distinctio odit inventore in vel ut dolor
        fugit? Numquam, voluptates sed? Fugiat suscipit aliquam officiis
        voluptates similique laudantium quae maiores. Culpa id vero molestiae
        nam fuga laudantium odit deserunt recusandae consequuntur facilis!
        Ducimus corrupti saepe iure atque illo? Architecto sed nostrum minima
        veritatis recusandae alias amet provident perferendis fuga eaque
        consectetur labore, atque neque cupiditate! Voluptatum eveniet quidem
        itaque, repellat, facilis cupiditate aliquam tempora corrupti facere
        harum consectetur? Dignissimos autem, asperiores a, voluptates deserunt
        officia, consequatur aliquid quia facilis nihil iure architecto! Nam
        quidem, quas ipsum et, vero voluptas nesciunt corrupti quasi molestias
        aut veritatis. Laboriosam, quis ipsam. Consequatur ipsum quibusdam
        magnam voluptatem esse, voluptatum reiciendis rerum praesentium eius sit
        veniam similique, iusto tempore molestias reprehenderit earum maiores ea
        alias incidunt doloremque dolore explicabo quaerat. Assumenda, cumque
        qui.
      </div>
      <div data-testid="comment-footer" className="comment-footer">
        <div data-testid="comment-likes" className="comment-likes">
          <Image
            src="/like.svg"
            alt="like button"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setLikes(likes + 1);
            }}
          />
          {likes}
          <Image
            className="dislike"
            src="/like.svg"
            alt="dislike button"
            width={24}
            height={24}
            onClick={(e) => {
              e.stopPropagation();
              setLikes(likes - 1);
            }}
          />
        </div>
        <div className="comment-reply">REPLY</div>
        <div className="comment-report">REPORT</div>
      </div>
    </div>
  );
};
