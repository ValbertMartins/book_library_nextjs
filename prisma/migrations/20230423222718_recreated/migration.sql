-- CreateTable
CREATE TABLE `tudentProgress` (
    `id` VARCHAR(191) NOT NULL,
    `collected_books` INTEGER NOT NULL,
    `returned_books` INTEGER NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tudentProgress_studentId_key`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tudentProgress` ADD CONSTRAINT `tudentProgress_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `students`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
