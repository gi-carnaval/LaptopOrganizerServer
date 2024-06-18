-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Laptop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "laptopCode" INTEGER NOT NULL,
    "cartId" TEXT NOT NULL,
    CONSTRAINT "Laptop_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_laptopCode_key" ON "Laptop"("laptopCode");
