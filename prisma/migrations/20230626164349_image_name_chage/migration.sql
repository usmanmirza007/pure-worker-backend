/*
  Warnings:

  - You are about to drop the column `serviceFirstImage` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceSecondImage` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `serviceThirdImage` on the `Service` table. All the data in the column will be lost.
  - Added the required column `serviceImageFirst` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceImageSecond` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceImageThird` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Service` DROP COLUMN `serviceFirstImage`,
    DROP COLUMN `serviceSecondImage`,
    DROP COLUMN `serviceThirdImage`,
    ADD COLUMN `serviceImageFirst` VARCHAR(191) NOT NULL,
    ADD COLUMN `serviceImageSecond` VARCHAR(191) NOT NULL,
    ADD COLUMN `serviceImageThird` VARCHAR(191) NOT NULL;
