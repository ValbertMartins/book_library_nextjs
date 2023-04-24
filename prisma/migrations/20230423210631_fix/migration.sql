/*
  Warnings:

  - Made the column `collected_books` on table `studentProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `returned_books` on table `studentProgress` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `studentProgress` MODIFY `collected_books` INTEGER NOT NULL,
    MODIFY `returned_books` INTEGER NOT NULL;
