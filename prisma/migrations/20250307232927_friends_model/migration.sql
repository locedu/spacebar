-- CreateTable
CREATE TABLE "UserFriends" (
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "UserFriends_userId_idx" ON "UserFriends"("userId");

-- CreateIndex
CREATE INDEX "UserFriends_friendId_idx" ON "UserFriends"("friendId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFriends_userId_friendId_key" ON "UserFriends"("userId", "friendId");

-- AddForeignKey
ALTER TABLE "UserFriends" ADD CONSTRAINT "UserFriends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriends" ADD CONSTRAINT "UserFriends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
