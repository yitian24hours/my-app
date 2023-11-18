-- CreateTable
CREATE TABLE `GeneReporting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reportingName` VARCHAR(191) NOT NULL,
    `des` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `version` INTEGER NOT NULL,

    UNIQUE INDEX `GeneReporting_reportingName_key`(`reportingName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GeneReportingData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chrType` VARCHAR(191) NOT NULL,
    `chrStart` INTEGER NOT NULL,
    `chrEnd` INTEGER NOT NULL,
    `chrValue` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `geneReportingId` INTEGER NOT NULL,
    `version` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GeneReportingData` ADD CONSTRAINT `GeneReportingData_geneReportingId_fkey` FOREIGN KEY (`geneReportingId`) REFERENCES `GeneReporting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
