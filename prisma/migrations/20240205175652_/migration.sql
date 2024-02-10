/*
  Warnings:

  - You are about to drop the `MerchantLocation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MerchantNearbyLandmark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MerchantLocation" DROP CONSTRAINT "MerchantLocation_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "MerchantNearbyLandmark" DROP CONSTRAINT "MerchantNearbyLandmark_merchantId_fkey";

-- DropTable
DROP TABLE "MerchantLocation";

-- DropTable
DROP TABLE "MerchantNearbyLandmark";

-- CreateTable
CREATE TABLE "merchant_locations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,
    "lng" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(100) NOT NULL,

    CONSTRAINT "merchant_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchant_nearby_Landmarks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,
    "lng" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(100) NOT NULL,

    CONSTRAINT "merchant_nearby_Landmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchant_locations_merchantId_key" ON "merchant_locations"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "merchant_nearby_Landmarks_merchantId_key" ON "merchant_nearby_Landmarks"("merchantId");

-- AddForeignKey
ALTER TABLE "merchant_locations" ADD CONSTRAINT "merchant_locations_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant_nearby_Landmarks" ADD CONSTRAINT "merchant_nearby_Landmarks_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
