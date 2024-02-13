/*
  Warnings:

  - You are about to alter the column `value` on the `prices` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "prices" ALTER COLUMN "value" SET DATA TYPE VARCHAR(20);
