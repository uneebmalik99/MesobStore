import React, { useEffect, useState ,forwardRef, useImperativeHandle, useRef } from "react";

import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { ApiSendMail, CHECKOUT_API_URL} from '../../api_service';
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



const sendOrderMail = async () => {

  try {
    const payload = {
      email: 'uneebmalik99@gmail.com',
      message: `${'uneebmalik99@gmail.com'} , Your order is placed successfully!`,
      subject: 'Order Placed Successfully!',
    };
    const res = await ApiSendMail(payload);

   console.log('email respomsedtfhtjkb'+res);
    
   
  } catch (error) {
  
     alert('Alert', error);
     console.log('djkvndjvkjd',error);

  }
};



// const sendToMesob = async () => {
//   if (!email) return;
//   try {
//     const productRows = productDetails.map((product, index) => {
//     let price =  product.price;
      
//       if(price.includes(',')){
//           price = price.replace(',', '');
//       }
//       const priceWithoutDollarSign = parseFloat(
//        price.replace('$', ''),
//       );

//       let cost =  product.cost;
//       if(cost.includes(',')){
//         cost = cost.replace(',', '');
//       }

//       const costWithoutDollarSign = parseFloat(cost.replace('$', ''));
//       const quantity = parseFloat(product.qty);
//       console.log(
//         'Product Price IS:',
//         priceWithoutDollarSign,
//         'Product Quantity: ',
//         quantity,
//       );
        
    
//       let sellingPrice = priceWithoutDollarSign * quantity;
     
//       console.log('Selling Price: ', sellingPrice);

//       let costPrice = costWithoutDollarSign * quantity;
//       console.log(' costPrice: ', costPrice);

//       totalSellingPrice += sellingPrice;
//       totalCost += costPrice;

//       console.log('Total Selling Price: ', totalSellingPrice);
//       console.log('Total Cost Price: ', totalCost);

//       return `
//   <tr key=${index}>
//     <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${
//       index + 1
//     }</td>
//     <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${
//       product.title
//     }</td>
//     <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${
//       product.country
//     }</td>
//     <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${
//       product.qty
//     }</td>
//     <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${
//       product.cost
//     }</td>
//     <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${
//       product.price
//     }</td>
//   </tr>`;
//     });

//     const tableHTML = productRows.join('');

//     const message = `
//     <h3>1. Sender Info: </h3>
//     <ul>
//       <li>Name: ${senderDetails?.name}</li>
//       <li>Email: ${senderDetails?.email}</li>
//       <li>Address: ${senderDetails?.address}</li>
//       <li>Phone: ${senderDetails?.phone}</li>
//       <li>City: ${senderDetails?.city}</li>
//       <li>State: ${senderDetails?.state}</li>
//       <li>Zip Code: ${senderDetails?.pincode}</li>
//     </ul>
//     <h3>2. Receiver Info: </h3>
//     <ul>
//       <li>Name: ${orderDetails?.data.createOrder.name}</li>
//       <li>Street Address: ${orderDetails?.data.createOrder.address}</li>
//       <li>Phone: ${orderDetails?.data.createOrder.phone}</li>
//       <li>City: ${orderDetails?.data.createOrder.city}</li>
//     </ul>
//     <h2>Product Details:</h2>
//     <table style="border-collapse: collapse; width: 100%;">
//       <thead>
//         <tr>
//           <th style="border: 1px solid #ccc; padding: 8px;">Sr No.</th>
//           <th style="border: 1px solid #ccc; padding: 8px;">Name</th>
//           <th style="border: 1px solid #ccc; padding: 8px;">Country</th>
//           <th style="border: 1px solid #ccc; padding: 8px;">Quantity</th>
//           <th style="border: 1px solid #ccc; padding: 8px;">Cost</th>
//           <th style="border: 1px solid #ccc; padding: 8px;">Selling Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${tableHTML}
//       </tbody>
//     </table>
//     <p>Total Selling Price: ${totalSellingPrice}</p>
//     <p>Total Cost Price: ${totalCost}</p>
//     <p>Thank you for your order!</p>
//   `;

//     const subject = 'Order Placed Successfully!';

//     const payload = {
//       email: 'mesob@mesobstore.com',
//       message: message,
//       subject: subject,
//     };

//     // Call the api_send_mail function to send the email using the API
//     const res = await api_send_mail(payload);

    
//   } catch (error) {
//     Alert.alert('Alert', error.message);
//   }
// };


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

    sendOrderMail();
    // sendToMesob();

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


