import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        searchitems: [],
        totalQuantity: 0,
        changed: false,
        clientSecret:'',
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addClientSecret(state, action) {
            state.clientSecret = action.payload.clientSecret;
          },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            const itemQuantity = newItem.quantity || 1;
            state.totalQuantity += itemQuantity;
            state.changed = true;
            if (!existingItem) {
                let p = newItem.price;
                p= p.replace('$','');
                state.items.push({
                    id: newItem.id,
                    price: p,
                    quantity: itemQuantity,
                    category:newItem.category,
                    selleremail:newItem.selleremail,
                    cost:newItem.cost,
                    totalPrice: p*itemQuantity,
                    name: newItem.title,
                    image: newItem.image,
                    country:newItem.country
                });
            } else {
               let p = newItem.price;
               p= p.replace('$','');
            //    console.log('pfirstvs'+ p );
                existingItem.quantity++;
                existingItem.totalPrice += p;
            }
        },

        seacrhItem(state, action) {
            
            const newItem = action.payload;
            state.changed = true;
            state.searchitems= newItem
            console.log("bhgyg");
               
        },
        increaseItemFromCart(state, action) {
            const id = action.payload;
            // const existingItem = state.items.find((item) => item.id === id);
            existingItem.totalPrice -= `${existingItem.price}`;
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;

            state.changed = true;
            state.items = state.items.filter((item) => item.id !== id);
            state.totalQuantity = state.items.reduce(
                (acc, cur) => acc + cur.quantity,
                0
            );
        },
        updateItemQuantityFromCart(state, action) {
            const newQuantity = action.payload;

            state.items = state.items.map((item) => ({
                ...item,
                quantity: newQuantity[item.id] || item.quantity,
                totalPrice: item.price * newQuantity[item.id] || item.price,
            }));
            state.totalQuantity = state.items.reduce(
                (acc, cur) => acc + cur.quantity,
                0
            );
            state.changed = true;
        },
        clearAllFromCart(state) {
            state.changed = true;
            state.items = [];
            state.totalQuantity = 0;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
