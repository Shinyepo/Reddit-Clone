import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return NextResponse.json({ posts: data });
}

export async function POST(request: NextRequest) {
  const { title, content }: Post = await request.json();

  const newPost = await prisma.post.create({
    data: {
      content,
      title,
      authorId: 1,
      likes: 0,
      dislikes: 0,
    },
  });
  if (newPost.id) {
    return new NextResponse("Post Created", {
      status: 200,
    });
  }
  return new NextResponse("Something went wrong.", {
    status: 400,
  });
}
