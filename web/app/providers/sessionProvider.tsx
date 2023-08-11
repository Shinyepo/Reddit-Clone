"use client";
import { FC } from "react";
import { SessionProvider } from "next-auth/react";
type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
