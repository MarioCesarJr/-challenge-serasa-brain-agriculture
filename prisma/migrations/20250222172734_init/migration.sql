-- CreateTable
CREATE TABLE "producer" (
    "id" UUID NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" UUID NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "arable_area" DOUBLE PRECISION NOT NULL,
    "vegetation_area" DOUBLE PRECISION NOT NULL,
    "producer_id" UUID NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crop" (
    "id" UUID NOT NULL,
    "crop_name" TEXT NOT NULL,
    "harvest_year" INTEGER NOT NULL,
    "property_id" UUID NOT NULL,

    CONSTRAINT "crop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producer_cpf_cnpj_key" ON "producer"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop" ADD CONSTRAINT "crop_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
