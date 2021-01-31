const reducer = (state, action) => {
    switch(action.type){
        case 'CLEAR_CART':
        const newState = {...state, cart: []}
        return newState;
        
        case 'SET_DATA':
            return {...state, cart : action.payload, isLoading: false}

        case 'REMOVE_ITEM':
            const newCart = state.cart.filter(item => item.id !== action.payload);
            return {...state, cart: newCart};

        case 'INCREASE_AMOUNT':
            const increasedItem = state.cart.map(item => {
               if (item.id === action.payload){
                   return {...item, amount: item.amount + 1}
               }
               return item;
            });
            return {...state, cart: increasedItem};
        
        case 'DECREASE_AMOUNT':
            const decreaseItem = state.cart.map(item => {
                if (item.id === action.payload){
                   return {...item, amount: item.amount - 1}
                }
                return item;
            }).filter(item => item.amount > 0);
            return {...state, cart: decreaseItem};
        
        case 'SET_AP':
            const {totalItem, totalPrice} = state.cart.reduce((acc, val) => {
                acc.totalItem =acc.totalItem + val.amount;
                acc.totalPrice = acc.totalPrice + (val.amount * val.price);
                return acc;
                
              }, {totalItem : 0, totalPrice: 0});
            return {...state, totalItem: totalItem, totalPrice: parseFloat(totalPrice.toFixed(2))} 
        default:
            return state;
    }
    // if (action.type === 'CLEAR_CART'){
    //     const newState = {...state, cart: []}
    //     return newState;
    // }
    // return state
}

export default reducer