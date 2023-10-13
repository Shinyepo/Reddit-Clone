"use client";
import { FC, useRef } from "react";
import "./header.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {}

export const Header: FC<Props> = () => {
  const session = useSession();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!ref.current) return;
    ref.current.classList.toggle("profile-dropdown-show");
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo" role="heading">
          <a href="/">Epoddit</a>
        </div>
        <div className="search-box">
          {/* <input
            role="searchbox"
            type="text"
            placeholder="Search threads..."
            className="search-field"
          ></input> */}
        </div>
        <div role="menu" className="profile-section">
          {session.status === "authenticated" ? (
            <div className="profile-dropdown">
              <div onClick={handleClick} className="profile-dropdown-button">
                Welcome, {session.data.user?.username}!
              </div>
              <div ref={ref} className="profile-dropdown-content">
                <div onClick={async () => await signOut()}>Log Out</div>
              </div>
            </div>
          ) : (
            <div className="register">
              <div
                style={{ marginLeft: "10px" }}
                onClick={async () => await signIn()}
              >
                Sign In
              </div>
              <div
                style={{ marginLeft: "20px" }}
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/register");
                }}
              >
                Register
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
