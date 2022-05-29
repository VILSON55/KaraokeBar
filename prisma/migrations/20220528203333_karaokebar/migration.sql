/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `updatedAt` on the `users` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum("users_role")` to `VarChar(255)`.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `musics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(20) NOT NULL,
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `createdAt` DATETIME(0) NULL,
    MODIFY `updatedAt` DATETIME(0) NULL,
    MODIFY `role` VARCHAR(255) NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `items`;

-- DropTable
DROP TABLE `musics`;

-- DropTable
DROP TABLE `orders`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_email_key` TO `email`;
