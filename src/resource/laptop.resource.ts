export interface GetLaptopsByCartIdParams {
    cartSlug: string
}

export interface SaveLaptopInCartBody {
    laptopCode: number
    cartSlug: string
    password: string
}

export interface UpdateLaptopCartBody {
    laptopCode: number
    newCartSlug: string
}

export interface DeleteLaptop {
    password: string
    laptopCode: number
}

export interface GetCartNameByLaptopCodeParam {
    laptopCode: string
}