/*
  Warnings:

  - You are about to alter the column `scheduleDate` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `appointmentTime` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `Service` MODIFY `scheduleDate` INTEGER UNSIGNED NULL,
    MODIFY `appointmentTime` INTEGER UNSIGNED NULL;
