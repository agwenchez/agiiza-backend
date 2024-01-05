/*
  Warnings:

  - Added the required column `storeAddress` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "storeAddress" VARCHAR(200) NOT NULL;
