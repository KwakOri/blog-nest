/*
  Warnings:

  - You are about to drop the column `bokdeokbang_usersId` on the `bokdeokbang_blogs` table. All the data in the column will be lost.
  - Made the column `blog_id` on table `bokdeokbang_posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "bokdeokbang_blogs" DROP CONSTRAINT "bokdeokbang_blogs_bokdeokbang_usersId_fkey";

-- AlterTable
ALTER TABLE "bokdeokbang_blogs" DROP COLUMN "bokdeokbang_usersId";

-- AlterTable
ALTER TABLE "bokdeokbang_posts" ALTER COLUMN "blog_id" SET NOT NULL;
