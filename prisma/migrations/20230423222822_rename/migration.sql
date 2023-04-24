/*
  Warnings:

  - You are about to drop the `tudentProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tudentProgress` DROP FOREIGN KEY `tudentProgress_studentId_fkey`;

-- DropTable
DROP TABLE `tudentProgress`;

-- CreateTable
CREATE TABLE `studentProgress` (
    `id` VARCHAR(191) NOT NULL,
    `collected_books` INTEGER NOT NULL,
    `returned_books` INTEGER NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `studentProgress_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `studentProgress` ADD CONSTRAINT `studentProgress_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
