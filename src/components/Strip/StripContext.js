import React from 'react';

const initalState = {stripeKey: 'test stripe key'};
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STRIPE_KEY':
      console.log('action==', action.payload);
      return {...state, stripeKey: action.payload};
    default:
      return state;
  }
};

export const StripeKeyContext = React.createContext({});

const StripeKeyContextProvider = ({children}) => {
  const [state, stripKeyDispatch] = React.useReducer(reducer, initalState);
  return (
    <StripeKeyContext.Provider value={{state, stripKeyDispatch}}>
      {children}
    </StripeKeyContext.Provider>
  );
};

export default StripeKeyContextProvider;
