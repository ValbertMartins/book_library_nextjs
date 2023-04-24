/*
  Warnings:

  - You are about to drop the `tudentProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tudentProgress` DROP FOREIGN KEY `tudentProgress_studentId_fkey`;

-- DropTable
DROP TABLE `tudentProgress`;
