/*
  Warnings:

  - Made the column `gender` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `students` MODIFY `gender` VARCHAR(191) NOT NULL;
