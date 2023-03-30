import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

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
      comments: true,
    },
  });
  if (!data) return notFound();
  return NextResponse.json({ thread: data });
}
