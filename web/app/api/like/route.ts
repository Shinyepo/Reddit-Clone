import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(AuthOptions);
  if (!session || !session.user) return NextResponse.json("Not Authenticated");
  const {
    userId,
    postId,
    commentId,
    like,
  }: {
    userId: string;
    postId: string;
    like: boolean;
    commentId?: string;
  } = await req.json();
  const psId = parseInt(postId);

  if (commentId) {
    const comId = parseInt(commentId);
    const check = await prisma.likes.findFirst({
      where: {
        userId,
        commentId: comId,
      },
    });

    if (!check) {
      await prisma.likes.create({
        data: {
          like,
          userId,
          commentId: comId,
          postId: psId,
        },
      });
      return NextResponse.json({ created: true, message: "Created new like" });
    }

    if (check.like === like)
      return NextResponse.json({ message: "Already liked" }, { status: 400 });

    const data = await prisma.likes.updateMany({
      where: {
        commentId: comId,
        postId: psId,
        userId,
      },
      data: {
        like,
      },
    });
    return NextResponse.json({ created: false, message: "Toggled like" });
  }
  const check = await prisma.likes.findFirst({
    where: {
      userId,
      commentId: null,
      postId: psId,
    },
  });

  if (!check) {
    await prisma.likes.create({
      data: {
        like,
        userId,
        postId: psId,
      },
    });
    return NextResponse.json({ created: true, message: "Created new like" });
  }

  if (check.like === like)
    return NextResponse.json({ message: "Already liked" }, { status: 400 });

  await prisma.likes.updateMany({
    where: {
      commentId: null,
      postId: psId,
      userId,
    },
    data: {
      like,
    },
  });
  return NextResponse.json({ created: false, message: "Toggled like" });
}
