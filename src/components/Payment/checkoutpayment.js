import React, { useEffect, useState ,forwardRef, useImperativeHandle, useRef } from "react";

import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { ApiSendMail, CHECKOUT_API_URL} from '../../api_service';
import { cartActions } from "../../store/cart/cart-slice";
import { useDispatch, useSelector } from 'react-redux';
// import {api_send_mail, CHECKOUT_API_URL} from '../../api_service';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// import {api_send_mail, CHECKOUT_API_URL} from '../../api_service';

const CheckoutForm = ({sennd,SubTotal, receiver_obj8}) => {
  let clientId = '';

  const isLocalhost = () => {
    // Check if hostname contains 'localhost' or resolves to loopback IP address
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

if (isLocalhost()) {
    console.log('Running in local development environment');
    // Use sandbox or local settings
     clientId = 'AUI_SWyj_kfkuONQ_fe6KD-70qHAp2vRom3nAivzP2KaajvHst_nthZNw4d5hTCVndUctofi2_6Nl8bu';
    // Other local configurations
} else {
    console.log('Running in live production environment');
    // Use live settings
     clientId = 'AVpz-RlQ2NQtOH27s9jabSWT8Sx2NmUns-NfbxeYUVx1pAMe2w4mQCHBAq-xNkpOqcXlo0kVHw-bBpoB';
    // Other live configurations
}

// console.log('total price => ', sennd );
console.log('total price => ', receiver_obj8);

let emails = [];

const contentObj2 = JSON.parse(receiver_obj8.Products);

for(let i =0; i<contentObj2.length; i++){
  console.log('gvhthtthhf', contentObj2[i].selleremail);
  if (contentObj2[i].selleremail && contentObj2[i].selleremail.includes(',')) {
    const emailValues = contentObj2[i].selleremail.split(',');
  emails.push(...emailValues);
  }else{
    const emailValues = contentObj2[i].selleremail;
  emails.push(emailValues);
  }
  
}
console.log("jvbhjvsd", emails);
const uniqueEmails = [...new Set(emails)];
console.log('uniqueEmails  ', uniqueEmails);

const clientSecret2 = useSelector((state) => state.cart.clientSecret);
const dispatch = useDispatch();
const stripe = useStripe();
const elements = useElements();
const [email, setEmail] = useState("");
const [errorMessage, setErrorMessage] = useState(null);
const [message, setMessage] = useState (null);
const [show, setShow] = useState(false);
const [success, setSuccess] = useState(false);
const [orderID, setOrderID] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [client_secret, setclient_secret] =useState('')
const [value , setvalue] = useState('')
const clearAllItemHandler = () => {
  console.log('cart clear');
  dispatch(cartActions.clearAllFromCart());
};

console.log('SubTotal=>',SubTotal);

const sendOrderMail = async () => {

  try {
    const payload = {
      email: sennd.email,
      message: `${sennd.email} , Your order is placed successfully!`,
      subject: 'Order Placed Successfully!',
    };
    const res = await ApiSendMail(payload);

   console.log('email respomsedtfhtjkb'+res);
    
   
  } catch (error) {
  
     alert('Alert sendOrderMail', error);
     console.log('djkvndjvkjd',error);

  }
};

const sendToMesob = async () => {
  try {
    let productRows = []; // Initialize an empty array to hold the rows
    const product = receiver_obj8;
    let totalSellingPrice = 0;
    let totalCost = 0;
    const contentObj = JSON.parse(product.Products);

    // const productRows = productDetails.map((product, index) => {
      for(let i =0; i<contentObj.length; i++){


      const product = receiver_obj8;
      const contentObj = JSON.parse(product.Products);
      let price = contentObj[i].price;
      price = price.replace(',', '');
      const priceWithoutDollarSign = parseFloat(price.replace('$', ''));
      const costWithoutDollarSign = parseFloat(contentObj[i].cost.replace('$', ''));
      const quantity = parseFloat(contentObj[i].quantity);
      let sellingPrice = priceWithoutDollarSign * quantity;
      let costPrice = costWithoutDollarSign * quantity;
      totalSellingPrice += sellingPrice;
      totalSellingPrice = totalSellingPrice.toFixed(2)
      totalCost += costPrice;
      totalCost = totalCost.toFixed(2)

      // Create the row and push it to the productRows array
      let row = `
        <tr key=${i+1}>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${i+1}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${contentObj[i].name}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${contentObj[i].country}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${contentObj[i].quantity}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${contentObj[i].cost}</td>
          <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${contentObj[i].price}</td>
        </tr>`;
      productRows.push(row); // Push the row to the productRows array
    
  }
    const tableHTML = productRows.join('');

    const message = `
    <h3>1. Sender Info: </h3>
    <ul>
      <li>Name: ${sennd?.name}</li>
      <li>Email: ${sennd?.email}</li>
      <li>Address: ${sennd?.address}</li>
      <li>Phone: ${sennd?.phone}</li>
      <li>City: ${sennd?.city}</li>
      <li>State: ${sennd?.state}</li>
      <li>Zip Code: ${sennd?.pincode}</li>
    </ul>
    <h3>2. Receiver Info: </h3>
    <ul>
      <li>Name: ${receiver_obj8?.name}</li>
      <li>Street Address: ${receiver_obj8?.address}</li>
      <li>Phone: ${receiver_obj8?.phone}</li>
      <li>City: ${receiver_obj8?.city}</li>
    </ul>
    <h2>Product Details:</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ccc; padding: 8px;">Sr No.</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Name</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Country</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Quantity</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Cost</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Selling Price</th>
        </tr>
      </thead>
      <tbody>
        ${tableHTML}
      </tbody>
    </table>
    <p>Total Selling Price: ${totalSellingPrice}</p>
    <p>Total Cost Price: ${totalCost}</p>
    <p>Thank you for your order!</p>
  `;

    const subject = 'Order Placed Successfully!';
      // email: 'mesob@mesobstore.com',
     
      for(let i =0 ; i<uniqueEmails.length; i++){
        const payload = {
          email: uniqueEmails[i],
          message: message,
          subject: subject,
        };
        const res = await ApiSendMail(payload);


      }
      const payload2= {
        email: 'mesob@mesobstore.com',
        message: message,
        subject: subject,
      };
      const res = await ApiSendMail(payload2);

    // Call the api_send_mail function to send the email using the API
   
  } catch (error) {
    // alert('Alert sendToMesob ', error);
    console.log('Alert sendToMesob ', error);
  }
};

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
    sendToMesob();
    }
  } catch (error) {
    setIsLoading(false);
    setMessage(error);

    // Handle any errors that occur during the process
    console.error(' error =  ',error);
  }




};
 // creates a paypal order
 const createOrder = (data, actions) => {
  return actions.order.create({
      purchase_units: [
          {
              description: "Paypal from Website",
              amount: {
                  currency_code: "USD",
                  value: SubTotal,
              },
          },
      ],
  }).then((orderID) => {
          setOrderID(orderID);
          return orderID;
      });
};

// check Approval
const onApprove = (data, actions) => {
  console.log('paypal approved',data);
  // dispatch(cartActions.clearAllFromCart());
  // sendOrderMail();
  // sendToMesob();
  return actions.order.capture().then(function (details) {
      const { payer } = details;
      console.log(details);
      dispatch(cartActions.clearAllFromCart());
      sendOrderMail();
      sendToMesob();
      setSuccess(true);
  });
 
};

//capture likely error
const onError = (data, actions) => {
  setErrorMessage("An Error occured with your payment ");
};




return (
  <form onSubmit={handleSubmit}>

<p className="text-black mb-2">Complete your payment here!</p>
<div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
<p className="text-black mt-2 mb-4" style={{ color:'grey'}}>Pay with Paypal</p>
</div>

  <PayPalScriptProvider options={{ "client-id": clientId }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
  </PayPalScriptProvider>

  <div style={{ display: 'flex',marginBlock :10,alignItems: 'center',}}>
  <p style={{ flex: 1, textAlign: 'center', color:'grey' }}>--------------------</p>
  <p style={{ margin: '0 10px', color:'grey'  }}>Or pay with Card</p>
  <p style={{ flex: 1, textAlign: 'center', color:'grey'  }}>--------------------</p>
</div>


  <PaymentElement />
  <button  
  
  className='bg-black rounded-xl text-white p-2 mt-6 mb-2' style={{width:'100%'}}>
    {isLoading ? "Loading ... " : "Place Order"}
  </button>
  {message && <div>{message}</div>}
</form>

)

};
export default CheckoutForm ;


