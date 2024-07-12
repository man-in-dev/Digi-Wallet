/*
  Warnings:

  - The `type` column on the `OnRampTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OnRampType" AS ENUM ('P2p', 'Self');

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "type",
ADD COLUMN     "type" "OnRampType" NOT NULL DEFAULT 'Self';

-- DropEnum
DROP TYPE "OnRampTypes";
