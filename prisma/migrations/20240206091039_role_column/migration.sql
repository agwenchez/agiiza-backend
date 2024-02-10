/*
  Warnings:

  - Added the required column `role` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "role" VARCHAR(50) NOT NULL;
