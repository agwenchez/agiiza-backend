/*
  Warnings:

  - You are about to drop the column `location` on the `merchants` table. All the data in the column will be lost.
  - You are about to drop the column `nearbyLandmark` on the `merchants` table. All the data in the column will be lost.
  - Added the required column `merchantLocationId` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchants" DROP COLUMN "location",
DROP COLUMN "nearbyLandmark",
ADD COLUMN     "merchantLocationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MerchantLocation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "merchantId" TEXT NOT NULL,
    "lng" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(100) NOT NULL,

    CONSTRAINT "MerchantLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantLocation_merchantId_key" ON "MerchantLocation"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantLocation" ADD CONSTRAINT "MerchantLocation_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
