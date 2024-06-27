-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laptop" (
    "id" TEXT NOT NULL,
    "laptopCode" INTEGER NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_laptopCode_key" ON "Laptop"("laptopCode");

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
