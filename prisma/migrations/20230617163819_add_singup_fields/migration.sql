/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `nationality` VARCHAR(191) NULL;
