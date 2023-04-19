/*
  Warnings:

  - Made the column `class` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `grade` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `students` MODIFY `class` VARCHAR(191) NOT NULL,
    MODIFY `grade` INTEGER NOT NULL;
