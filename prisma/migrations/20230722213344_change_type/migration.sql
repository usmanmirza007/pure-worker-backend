/*
  Warnings:

  - You are about to alter the column `scheduleDate` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `appointmentTime` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Service` MODIFY `scheduleDate` INTEGER NULL,
    MODIFY `appointmentTime` INTEGER NULL;
