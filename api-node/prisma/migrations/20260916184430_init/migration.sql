-- CreateTable
CREATE TABLE "visitantes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,

    CONSTRAINT "visitantes_pkey" PRIMARY KEY ("id")
);
