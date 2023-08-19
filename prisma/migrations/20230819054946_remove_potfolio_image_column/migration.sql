/*
  Warnings:

  - You are about to drop the column `potfolioImageFirst` on the `ServicePotfolio` table. All the data in the column will be lost.
  - You are about to drop the column `potfolioImageSecond` on the `ServicePotfolio` table. All the data in the column will be lost.
  - You are about to drop the column `potfolioImageThird` on the `ServicePotfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ServicePotfolio` DROP COLUMN `potfolioImageFirst`,
    DROP COLUMN `potfolioImageSecond`,
    DROP COLUMN `potfolioImageThird`,
    ADD COLUMN `potfolioImages` LONGTEXT NULL;
