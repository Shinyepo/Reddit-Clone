-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
