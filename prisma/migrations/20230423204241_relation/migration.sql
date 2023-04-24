/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `studentProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `studentProgress_studentId_key` ON `studentProgress`(`studentId`);
