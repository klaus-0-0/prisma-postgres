-- CreateTable
CREATE TABLE public."Post" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "topic" TEXT NOT NULL,
  "published" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
