/*
  Warnings:

  - You are about to drop the column `potfolioFirst` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `potfolioSecond` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceImageFirst` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceImageSecond` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceImageThird` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Service` DROP COLUMN `potfolioFirst`,
    DROP COLUMN `potfolioSecond`,
    DROP COLUMN `serviceImageFirst`,
    DROP COLUMN `serviceImageSecond`,
    DROP COLUMN `serviceImageThird`;

-- CreateTable
CREATE TABLE `ServicePotfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `potfolioImageFirst` VARCHAR(191) NULL,
    `potfolioImageSecond` VARCHAR(191) NULL,
    `potfolioImageThird` VARCHAR(191) NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServicePotfolio` ADD CONSTRAINT `ServicePotfolio_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
