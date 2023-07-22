/*
  Warnings:

  - You are about to alter the column `scheduleDate` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.
  - You are about to alter the column `appointmentTime` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Service` MODIFY `scheduleDate` VARCHAR(191) NULL,
    MODIFY `appointmentTime` VARCHAR(191) NULL;
