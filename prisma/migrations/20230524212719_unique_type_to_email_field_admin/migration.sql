/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `studentsBooks_bookId_fkey` ON `studentsBooks`;

-- DropIndex
DROP INDEX `studentsBooks_studentId_fkey` ON `studentsBooks`;

-- CreateIndex
CREATE UNIQUE INDEX `admins_email_key` ON `admins`(`email`);
