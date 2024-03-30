/*
  Warnings:

  - Added the required column `description` to the `merchants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "description" VARCHAR(3000) NOT NULL,
ADD COLUMN     "location" VARCHAR(200) NOT NULL;
