export const getAllCategories = async () => {
    const responseCategories = await fetch ('https://dummyjson.com/products/category-list');

    return responseCategories;
}