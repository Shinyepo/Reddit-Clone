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
      <body>
        <header>
          <div className="header-container">
            <div className="logo" role="heading">Epodit</div>
            <div className="search-box">
              <input
                role="searchbox"
                type="text"
                placeholder="Search threads..."
                className="search-field"
              ></input>
            </div>
            <div role="menu" className="profile-section">Profile section</div>
          </div>
        </header>
        <main className="main">{children}</main>
      </body>
  );
}
