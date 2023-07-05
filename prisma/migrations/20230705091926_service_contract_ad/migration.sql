/*
  Warnings:

  - You are about to drop the `ServiceContract` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ServiceContract` DROP FOREIGN KEY `ServiceContract_serviceId_fkey`;

-- AlterTable
ALTER TABLE `Service` ADD COLUMN `addressFirst` VARCHAR(191) NULL,
    ADD COLUMN `addressSecond` VARCHAR(191) NULL,
    ADD COLUMN `emailFirst` VARCHAR(191) NULL,
    ADD COLUMN `emailSecond` VARCHAR(191) NULL,
    ADD COLUMN `fullNameFirst` VARCHAR(191) NULL,
    ADD COLUMN `fullNameSecond` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumberFirst` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumberSecond` VARCHAR(191) NULL,
    ADD COLUMN `relationFirst` VARCHAR(191) NULL,
    ADD COLUMN `relationSecond` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `ServiceContract`;
