-- AlterTable
ALTER TABLE "visitantes" ADD COLUMN "area_interesse" TEXT;

UPDATE "visitantes"
SET "area_interesse" = 'Não informada';

ALTER TABLE "visitantes"
ALTER COLUMN "area_interesse" SET NOT NULL;
