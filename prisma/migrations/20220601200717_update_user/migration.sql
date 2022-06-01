/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` TIMESTAMP(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updatedAt` DATETIME(3) NULL,
    ADD PRIMARY KEY (`id`);
