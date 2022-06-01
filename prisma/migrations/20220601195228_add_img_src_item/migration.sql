/*
  Warnings:

  - Added the required column `imgSrc` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` ADD COLUMN `imgSrc` VARCHAR(255) NOT NULL;
