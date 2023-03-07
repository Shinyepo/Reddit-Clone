
import { ThreadPreview } from "@/components/threadPreview";
import "./page.css";

export default function Home() {
  return (
    <div className="main-container">
      <div className="threads" role="article">
        <ThreadPreview />
      </div>
      <div data-testid="sidebar" className="sidebar">
        <div data-testid="about" className="about">
          <div className="about-header" role="heading">A header for about section</div>
          <div className="about-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            consectetur illo molestiae minima nesciunt dolores, ea adipisci
            maxime eius, nulla blanditiis earum. Necessitatibus quam adipisci
            ducimus possimus ab animi dolorem?
          </div>
        </div>
      </div>
    </div>
  );
}
