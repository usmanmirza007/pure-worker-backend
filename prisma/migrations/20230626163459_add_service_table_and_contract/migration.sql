-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profilePicture` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `serviceDetail` JSON NOT NULL,
    `price` JSON NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `potfolioFirst` VARCHAR(191) NULL,
    `potfolioSecond` VARCHAR(191) NULL,
    `serviceFirstImage` VARCHAR(191) NOT NULL,
    `serviceSecondImage` VARCHAR(191) NOT NULL,
    `serviceThirdImage` VARCHAR(191) NOT NULL,
    `idNumber` VARCHAR(191) NULL,
    `businessName` VARCHAR(191) NULL,
    `cac` VARCHAR(191) NULL,
    `scheduleDate` VARCHAR(191) NULL,
    `appointmentTime` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceContract` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contractFirst` VARCHAR(191) NOT NULL DEFAULT 'First',
    `fullNameFirst` VARCHAR(191) NOT NULL,
    `relationFirst` VARCHAR(191) NOT NULL,
    `emailFirst` VARCHAR(191) NOT NULL,
    `phoneNumberFirst` VARCHAR(191) NOT NULL,
    `addressFirst` VARCHAR(191) NOT NULL,
    `contractSecond` VARCHAR(191) NOT NULL DEFAULT 'Second',
    `fullNameSecond` VARCHAR(191) NOT NULL,
    `relationSecond` VARCHAR(191) NOT NULL,
    `emailSecond` VARCHAR(191) NOT NULL,
    `phoneNumberSecond` VARCHAR(191) NOT NULL,
    `addressSecond` VARCHAR(191) NOT NULL,
    `serviceId` INTEGER NULL,

    UNIQUE INDEX `ServiceContract_emailFirst_key`(`emailFirst`),
    UNIQUE INDEX `ServiceContract_emailSecond_key`(`emailSecond`),
    UNIQUE INDEX `ServiceContract_serviceId_key`(`serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceContract` ADD CONSTRAINT `ServiceContract_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
