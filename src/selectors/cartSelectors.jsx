export const selectCartItems = state => state.cart.items;
export const selectCartItemById = (state, itemId) => state.cart.items.find(item => item.id === itemId);
