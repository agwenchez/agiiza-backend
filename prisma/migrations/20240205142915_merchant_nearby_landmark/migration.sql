/*
  Warnings:

  - Added the required column `merchantNearbyLandmarkId` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "merchantNearbyLandmarkId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MerchantNearbyLandmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "merchantId" TEXT NOT NULL,
    "lng" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(100) NOT NULL,

    CONSTRAINT "MerchantNearbyLandmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantNearbyLandmark_merchantId_key" ON "MerchantNearbyLandmark"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantNearbyLandmark" ADD CONSTRAINT "MerchantNearbyLandmark_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
