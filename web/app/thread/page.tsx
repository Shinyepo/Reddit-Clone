import { ThreadLikes } from "@/components/threadLikes";


export default function Home() {
  return <div className="thread-box">
    <div className="thread-header"></div>
    <div className="thread-main">
      <ThreadLikes />
    </div>
    <div className="thread-create-comment"></div>
    <div className="thread-comments"></div>
  </div>;
};
