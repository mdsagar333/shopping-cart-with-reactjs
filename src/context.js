import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  totalItem: 0,
  cart: cartItems,
  totalPrice:0,
  isLoading: true
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  const removeItem  = (id) => {
    dispatch({type: 'REMOVE_ITEM', payload: id})
  }

  const increaseAmount = (id) => {
    dispatch({type: 'INCREASE_AMOUNT', payload: id})
  }

  const decreaseAmount = (id) => {
    dispatch({type: 'DECREASE_AMOUNT', payload: id})
  }

  useEffect(() => {
    dispatch({type:'SET_AP'})
    
  }, [state.cart]);

  useEffect(async () => {
    const Rawdata = await fetch(url);
    const data = await Rawdata.json();
    dispatch({type:'SET_DATA', payload: data})
  }, [])

  return (
    <AppContext.Provider
      value={
        {...state, clearCart, removeItem,increaseAmount,decreaseAmount}
      }
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
