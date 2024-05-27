export const selectAllProducts = state => state.products.products;
export const selectProductById = (state, productId) => state.products.products.find(product => product.id === productId);
