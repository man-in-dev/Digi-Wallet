/*
  Warnings:

  - Made the column `provider` on table `OnRampTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "provider" SET NOT NULL;
