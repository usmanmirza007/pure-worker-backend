-- AlterTable
ALTER TABLE `Service` MODIFY `profilePicture` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `ServicePotfolio` MODIFY `potfolioImageFirst` LONGTEXT NULL,
    MODIFY `potfolioImageSecond` LONGTEXT NULL,
    MODIFY `potfolioImageThird` LONGTEXT NULL;
