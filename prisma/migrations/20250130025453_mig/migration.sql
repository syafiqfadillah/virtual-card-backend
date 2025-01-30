/*
  Warnings:

  - You are about to drop the column `qrPath` on the `EmployeeProfiles` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EmployeeProfiles] DROP COLUMN [qrPath];
ALTER TABLE [dbo].[EmployeeProfiles] ADD [qrFilename] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
