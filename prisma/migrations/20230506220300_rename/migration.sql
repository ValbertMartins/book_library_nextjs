/*
  Warnings:

  - You are about to drop the `booksOnStudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booksOnStudents` DROP FOREIGN KEY `booksOnStudents_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `booksOnStudents` DROP FOREIGN KEY `booksOnStudents_studentId_fkey`;

-- DropTable
DROP TABLE `booksOnStudents`;

-- CreateTable
CREATE TABLE `studentsBooks` (
    `id` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `studentsBooks` ADD CONSTRAINT `studentsBooks_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentsBooks` ADD CONSTRAINT `studentsBooks_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
