-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

UPDATE "User" SET "name" = 'teste' WHERE "name" IS NULL OR "name" = '';