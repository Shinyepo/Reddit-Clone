import "./page.css";

export default function Home() {
  return (
    <div data-testid="new-thread" className="new-thread">
      <div className="edit-container">
        <div data-testid="new-author" className="new-author">
          <div className="new-avatar"></div>
          ########
        </div>
        <div className="new-title">
          Title:
          <input data-testid="new-title" type="text" className="new-thread-title" placeholder="Thread title..." />
        </div>
        <div className="new-content">
          Content:
          <textarea data-testid="new-content" className="content-field" name="new-content" />
        </div>
        <div data-testid="new-submit" className="new-submit">
          <button type="submit" className="submit-thread">
            Submit
          </button>
        </div>
      </div>
      <div className="info-container"></div>
    </div>
  );
}
