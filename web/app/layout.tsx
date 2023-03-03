import "./globals.css";

export const metadata = {
  title: "Epodit",
  description: "A reddit clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="header-container">
            <div className="logo">Epodit</div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search threads..."
                className="search-field"
              ></input>
            </div>
            <div className="profile-section">Profile section</div>
          </div>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
