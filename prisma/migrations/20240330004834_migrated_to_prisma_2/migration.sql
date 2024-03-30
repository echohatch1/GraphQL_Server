-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "price" INTEGER,
    "desc" TEXT,
    "weight" TEXT,
    "manuf" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
