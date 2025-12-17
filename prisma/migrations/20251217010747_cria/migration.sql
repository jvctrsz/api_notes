-- CreateEnum
CREATE TYPE "Status" AS ENUM ('created', 'finished', 'deleted');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'created',
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "tag" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Histories" (
    "id" SERIAL NOT NULL,
    "history" TEXT NOT NULL,
    "notes_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_id_key" ON "Categories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_id_key" ON "Notes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Histories_id_key" ON "Histories"("id");

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Histories" ADD CONSTRAINT "Histories_notes_id_fkey" FOREIGN KEY ("notes_id") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
