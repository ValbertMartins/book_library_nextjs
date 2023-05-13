/*
  Warnings:

  - Made the column `quantity` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `quantity` INTEGER NOT NULL;
