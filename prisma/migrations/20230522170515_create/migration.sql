-- DropForeignKey
ALTER TABLE `studentProgress` DROP FOREIGN KEY `studentProgress_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `studentsBooks` DROP FOREIGN KEY `studentsBooks_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `studentsBooks` DROP FOREIGN KEY `studentsBooks_studentId_fkey`;

-- CreateTable
CREATE TABLE `admins` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
