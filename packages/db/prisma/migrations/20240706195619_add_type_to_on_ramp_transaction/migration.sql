-- CreateEnum
CREATE TYPE "OnRampTypes" AS ENUM ('P2p', 'Self');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "type" "OnRampTypes" NOT NULL DEFAULT 'Self';
