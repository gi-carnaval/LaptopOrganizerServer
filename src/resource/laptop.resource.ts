export interface GetLaptopsByCartIdParams {
    cartSlug: string
}

export interface SaveLaptopInCartBody {
    laptopCode: number
    cartSlug: string
}

export interface UpdateLaptopCartBody {
    laptopCode: number
    newCartSlug: string
}

export interface DeleteLaptop {
    laptopCode: number
}

export interface GetCartNameByLaptopCodeParam {
    laptopCode: string
}