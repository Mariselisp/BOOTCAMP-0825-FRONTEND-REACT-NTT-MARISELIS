export const searchProducts = async (product: string) => {
    const responseProducts = await fetch (`https://dummyjson.com/products/search?q=${product}`);

    return responseProducts;
}