import { ThreadFooter } from "../components/threadFooter";
import { ThreadLikes } from "../components/threadLikes";
import "../components/threadPreview.css";

export default function Loading() {
  return (
    <div role="link" className="preview-container">
      <ThreadLikes />
      <div className="thread-data">
        <div data-testid="thread-author" className="preview-author">
          created by
        </div>
        <div data-testid="thread-title" className="preview-title">
          <h2></h2>
        </div>
        <div data-testid="thread-content" className="preview-content"></div>
      </div>
      <ThreadFooter />
    </div>
  );
}
