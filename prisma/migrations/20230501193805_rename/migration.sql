/*
  Warnings:

  - You are about to drop the `booksOnStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booksOnStudent` DROP FOREIGN KEY `booksOnStudent_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `booksOnStudent` DROP FOREIGN KEY `booksOnStudent_studentId_fkey`;

-- DropTable
DROP TABLE `booksOnStudent`;

-- CreateTable
CREATE TABLE `booksOnStudents` (
    `id` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booksOnStudents` ADD CONSTRAINT `booksOnStudents_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booksOnStudents` ADD CONSTRAINT `booksOnStudents_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
