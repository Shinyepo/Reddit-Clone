/*
  Warnings:

  - A unique constraint covering the columns `[commentId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_commentId_fkey";

-- AlterTable
ALTER TABLE "Likes" ALTER COLUMN "commentId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Likes_commentId_key" ON "Likes"("commentId");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
