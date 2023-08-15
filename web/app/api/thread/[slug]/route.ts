import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } }
) {
  const id = parseInt(params.slug);

  if (!id) {
    return notFound();
  }
  const data = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      },
    },
  });
  if (!data) return notFound();
  return NextResponse.json({ thread: data });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(AuthOptions);
  if (!session || !session.user) return redirect("/");
  const { thread, content }: { thread: string; content: string } =
    await req.json();
  const postId = parseInt(thread);
  if (!postId) {
    return new NextResponse("Something went wrong.", {
      status: 400,
    });
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      authorId: session.user.id,
      content,
      dislikes: 0,
      likes: 0,
      parentId: 0,
    },
    include: {
      author: true
    }
  });

  if (!comment.id) {
    return new NextResponse("Something went wrong.", {
      status: 400,
    });
  }

  return NextResponse.json({ comment: comment });
}
