-- CreateTable
CREATE TABLE `studentProgress` (
    `id` VARCHAR(191) NOT NULL,
    `collected_books` INTEGER NULL,
    `returned_books` INTEGER NULL,
    `studentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `studentProgress` ADD CONSTRAINT `studentProgress_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
