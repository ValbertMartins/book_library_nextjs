/*
  Warnings:

  - You are about to drop the column `bookCover` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `bookCover`,
    ADD COLUMN `cover` VARCHAR(191) NULL;
