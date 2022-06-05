/*
  Warnings:

  - Made the column `createdAt` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updatedAt` DATETIME(3) NOT NULL;
