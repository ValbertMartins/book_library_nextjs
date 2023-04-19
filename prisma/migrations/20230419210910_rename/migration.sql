/*
  Warnings:

  - You are about to drop the column `class_age` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `class_letter` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `students` DROP COLUMN `class_age`,
    DROP COLUMN `class_letter`,
    ADD COLUMN `class` VARCHAR(191) NULL,
    ADD COLUMN `grade` INTEGER NULL;
