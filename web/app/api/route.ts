import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await prisma.post.create({
    data: {
      author: "mock",
      authorId: Math.round(Math.random() * 10),
    },
  });
  console.log(data.author);

  return NextResponse.json({ message: "Main route!" });
}
