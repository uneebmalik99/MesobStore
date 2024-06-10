
import React, { useEffect, useState ,forwardRef, useImperativeHandle, useRef } from "react";

import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { cartActions } from "../../store/cart/cart-slice";
import { useDispatch, useSelector } from 'react-redux';

const CheckoutForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();

// function  CheckoutForm (props) { 
const stripe = useStripe ();
const elements = useElements () ;
const [email, setEmail] = useState("");
const [errorMessage, setErrorMessage] = useState(null);
const [message, setMessage] = useState (null);
const [isLoading, setIsLoading] = useState(true);
const [client_secret, setclient_secret] =useState('')

  async function childFunction(data) {
    console.log("Child function called with data:", data);
    await clearAllItemHandler();
    // dispatch(cartActions.clearAllFromCart());
    handleSubmit(data)
    // Your code here
  }

  // Expose the childFunction to the parent component through the ref
  useImperativeHandle(ref, () => ({
    childFunction
  }));

useEffect ( () =>{
if (!stripe) {
    // alert('no sr=tripe')
    return;
}

const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
)

if(!clientSecret){
    return;
}

stripe.retrievePaymentIntent(clientSecret).then(({paymentintent})=>{
    switch(paymentintent.status){
        case 'succeeded':
            setMessage("succeeded");
            break;
        case "processing":
            setMessage("processing");
            break;
        case "requires_payment_mehtod":
            setMessage("not sucesfuly");
            break;
        default:
        setMessage("say something");
        break;
    }
});


},[stripe]);

const clearAllItemHandler = () => {
  console.log('cart clear');
  dispatch(cartActions.clearAllFromCart());
};



const handleSubmit = async (data) => {
    // event.preventDefault();
   

   
    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }
    
  
          // setStripeData(data);

          // const confirmPayment = await stripe?.confirmCardPayment(
          //   response.data.data.client_secret
          // ).then



          // const {error} = await stripe.confirmPayment(data.data.client_secret, {
          //   return_url: 'http://localhost:3000',
          // });
          
          // if (error) {
          //   setErrorMessage(error.message);
          // } else {
          //   // Redirect to your return URL
          // }

        const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret:data.data.client_secret,
            confirmParams: {
              // return_url: 'http://localhost:3000',
              return_url: 'https://www.mesobstore.com/',
            },
          });

          if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
          } else {
       
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
          }

      

    
  };



return (
    <form onSubmit={childFunction}>
    <PaymentElement />
  <div>{message}</div>
    {errorMessage && <div>{errorMessage}</div>}
  </form>
)


})


export default CheckoutForm ;