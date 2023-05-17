-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `otp` INTEGER NOT NULL,
    `dob` DATETIME(3) NULL,
    `businessName` VARCHAR(191) NULL,
    `cacNo` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `userType` ENUM('FREELANCER', 'BUSINESS', 'CUSTOMER', 'PROVIDER') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
