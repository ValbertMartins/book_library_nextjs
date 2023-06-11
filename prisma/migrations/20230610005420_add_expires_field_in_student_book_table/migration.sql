/*
  Warnings:

  - Added the required column `expires_in` to the `studentsBooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `studentsBooks` ADD COLUMN `expires_in` DATETIME(3) NOT NULL;
