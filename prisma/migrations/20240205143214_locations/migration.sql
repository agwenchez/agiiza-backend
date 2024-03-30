/*
  Warnings:

  - You are about to drop the column `merchantLocationId` on the `merchants` table. All the data in the column will be lost.
  - You are about to drop the column `merchantNearbyLandmarkId` on the `merchants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "merchants" DROP COLUMN "merchantLocationId",
DROP COLUMN "merchantNearbyLandmarkId";
