/*
  Warnings:

  - Added the required column `faxNbr` to the `EmployeeProfiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workPhoneNbr` to the `EmployeeProfiles` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EmployeeProfiles] ADD [faxNbr] NVARCHAR(1000) NOT NULL,
[workPhoneNbr] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
