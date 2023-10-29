import React, { useEffect, useState ,forwardRef, useImperativeHandle, useRef } from "react";

import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { CHECKOUT_API_URL} from '../../api_service';
import { cartActions } from "../../store/cart/cart-slice";
import { useDispatch, useSelector } from 'react-redux';
// import {api_send_mail, CHECKOUT_API_URL} from '../../api_service';

const CheckoutForm = ((props) => {

  const clientSecret2 = useSelector((state) => state.cart.clientSecret);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
const [email, setEmail] = useState("");
const [errorMessage, setErrorMessage] = useState(null);
const [message, setMessage] = useState (null);
const [isLoading, setIsLoading] = useState(false);
const [client_secret, setclient_secret] =useState('')
const [value , setvalue] = useState('')
const clearAllItemHandler = () => {
  console.log('cart clear');
  dispatch(cartActions.clearAllFromCart());
};

// useEffect(() => {
//   if (!stripe ) {
//     return;
//   }

//   const clientSecret = new URLSearchParams(window.location.search).get(
//    "/"
//   );

//   if (!clientSecret ) {
    
//     return;
//   }


//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       setMessage(paymentIntent.status === "succeeded" ? "Your payment succeeded" : "Unexpected error occurred");
//     });
  
 
// }, [stripe]);
// useEffect(() => {
//   if (!stripe) {
//     return;
//   }

//   const clientSecret = new URLSearchParams(window.location.search).get(
//     "payment_intent_client_secret"
//   );

//   if (!clientSecret) {
//     return;
//   }

//   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//     setMessage(paymentIntent.status === "succeeded" ? "Your payment succeeded" : "Unexpected error occurred");
//   });

// }, [stripe]);




const handleSubmit = async (event) => {
  setIsLoading(true);
  event.preventDefault();
  const {error: submitError} = await elements.submit();
  if (submitError) {
    // Show error to your customer
    setIsLoading(false);

    setMessage(submitError.message);
    return;
  }
  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
  }
 
  try {
    
    // Dispatch an action to clear the cart items
    // dispatch(cartActions.clearAllFromCsart());

    // Perform the Stripe payment confirmation
    const result = await stripe.confirmPayment({
      // `Elements` instance that was used to create the Payment Element
      elements,
      clientSecret:clientSecret2,

      confirmParams: {
        // return_url: "http://localhost:3000",
        return_url: "https://www.mesobstore.com/",
        

    },
        redirect: 'if_required' 
    
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setMessage(result.error.message);
      setIsLoading(false);

      console.log(result.error.message);
    } else {
    dispatch(cartActions.clearAllFromCart());

  //   const res = await api_send_mail(payload);

  //   console.log('Success Product: ', res.message);
  //   setloading1(false);
  //   setVisible(true);
  // } catch (error: any) {
  //   setloading1(false);
  //   Alert.alert('Alert', error.message);
  // }


      // Your customer will be redirected to the completion page
      // window.location.href = "http://localhost:3000";
    }
  } catch (error) {
    setIsLoading(false);
    setMessage(error);

    // Handle any errors that occur during the process
    console.error(' error =  ',error);
  }




};

return (
  <form onSubmit={handleSubmit}>
  <p className="text-black mb-4">Complete your payment here!</p>
  <PaymentElement />
  <button  
  
  className='bg-black rounded-xl text-white p-2 mt-6 mb-2' style={{width:'100%'}}>
    {isLoading ? "Loading ... " : "Place Order"}
  </button>
  {message && <div>{message}</div>}
</form>
)


})


export default CheckoutForm ;


