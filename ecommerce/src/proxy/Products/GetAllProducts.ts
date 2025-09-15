export const getAllProducts = async () => {
    const responseProducts = await fetch ('https://dummyjson.com/products');

    return responseProducts;
}