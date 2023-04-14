/*
  Warnings:

  - You are about to drop the `StudentWithBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `StudentWithBook` DROP FOREIGN KEY `StudentWithBook_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentWithBook` DROP FOREIGN KEY `StudentWithBook_studentId_fkey`;

-- DropTable
DROP TABLE `StudentWithBook`;

-- CreateTable
CREATE TABLE `booksOnStudent` (
    `id` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booksOnStudent` ADD CONSTRAINT `booksOnStudent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booksOnStudent` ADD CONSTRAINT `booksOnStudent_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
