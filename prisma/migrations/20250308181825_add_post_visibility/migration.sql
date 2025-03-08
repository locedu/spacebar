-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('public', 'friends');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "visibility" "PostVisibility" NOT NULL DEFAULT 'public';
