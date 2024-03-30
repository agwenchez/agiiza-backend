/*
  Warnings:

  - You are about to alter the column `nearbyLandmark` on the `merchants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(400)` to `Unsupported("geography(Point, 4326)")`.
  - You are about to alter the column `location` on the `merchants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `Unsupported("geography(Point, 4326)")`.

*/
-- AlterTable
-- ALTER TABLE "merchants" ALTER COLUMN "nearbyLandmark" SET DATA TYPE USING CAST(geography(Point, 4326)),
-- ALTER COLUMN "location"  SET DATA TYPE USING CAST(geography(Point, 4326));


ALTER TABLE "merchants"
ALTER COLUMN "nearbyLandmark" TYPE geography(Point, 4326) USING "nearbyLandmark"::geography(Point, 4326),
ALTER COLUMN "location" TYPE geography(Point, 4326) USING "location"::geography(Point, 4326);