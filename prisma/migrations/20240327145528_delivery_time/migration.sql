/*
  Warnings:

  - You are about to drop the column `categoryName` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `tagName` on the `tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagName]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryTime` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "categories_categoryName_key";

-- DropIndex
DROP INDEX "tags_tagName_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "categoryName",
ADD COLUMN     "categoryName" VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "deliveryTime" VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "tagName",
ADD COLUMN     "tagName" VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tagName_key" ON "tags"("tagName");
