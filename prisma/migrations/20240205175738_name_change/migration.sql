/*
  Warnings:

  - You are about to drop the `merchant_nearby_Landmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "merchant_nearby_Landmarks" DROP CONSTRAINT "merchant_nearby_Landmarks_merchantId_fkey";

-- DropTable
DROP TABLE "merchant_nearby_Landmarks";

-- CreateTable
CREATE TABLE "merchant_nearby_landmarks" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,
    "lng" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(100) NOT NULL,

    CONSTRAINT "merchant_nearby_landmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchant_nearby_landmarks_merchantId_key" ON "merchant_nearby_landmarks"("merchantId");

-- AddForeignKey
ALTER TABLE "merchant_nearby_landmarks" ADD CONSTRAINT "merchant_nearby_landmarks_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
