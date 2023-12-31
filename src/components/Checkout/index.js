import PropTypes, { element } from 'prop-types';
import { useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IoCheckmarkCircle } from 'react-icons/io5';
import EmptyCheckout from './EmptyCheckout';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {createOrder} from '../../graphql/mutations';
import { CHECKOUT_API_URL} from'../../api_service';
// import  from '@stripe/stripe-js';
import { loadStripe } from '@stripe/react-stripe-js'

import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CartElement,
} from '@stripe/react-stripe-js';
import CheckoutForm from '../Payment/checkoutpayment';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const singleField = `flex flex-col w-full`;
const inputField = `border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]`;
const textareaField = `border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full min-h-[120px]`;
const secondaryButton =
    'flex bg-secondary text-white leading-[38px] text-[15px] h-[40px] px-[32px]';

const isInitial = true;
let productDetails;
  
function Checkout({ checkoutItems }) {

const stripePromise = loadStripe('pk_test_51KZzWbAhBlpHU9kBF7mHsYqqk6Ma8MGqjS9PB2pfwRcSW9npj1fv3YCqsFOESqTYvzoGIdBuZ9y3qKpTkhwpc9TO00kMQrezA4');
const [childFunctionCalled, setChildFunctionCalled] = useState(false);


const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  appearance: {
    /*...*/
  },
};
const [message, setMessage] = useState('');

const [dataToChild, setDataToChild] = useState('');
  
const childRef = useRef();

  // Function to call the child component's function
//   function callChildFunction() {
//     if (childRef.current) {
//       childRef.current.childFunction();
//     }
//   }


  function callChildFunctionWithData(data) {
    if (childRef.current) {
    //   const dataToSend = "Hello from Parent!";
      childRef.current.childFunction(data);
    }
  }

//   const handleButtonClick = () => {
//     console.log('Button in parent component clicked.');
//     childFunction();
//     // Call any other logic or function you need here
//   }

    const [client_secret ,setclient_secret] = useState('')
    const [returningCustomer, setReturningCustomer] = useState(false);
    const openReturningCustomer = () => {
        setReturningCustomer(!returningCustomer);
    };
    const [senderObj, setSenderObj] = useState({});

    const [Receiver_name,setReceiver_name]=useState('')
    const [Receiver_phone,setReceiver_phone]=useState('')
    const [Receiver_address,setReceiver_address]=useState('')
    const [Receiver_city,setReceiver_city]=useState('')
    const [Receiver_country,setReceiver_country]=useState('')
    const [Receiver_state,setReceiver_state]=useState('')

    const [sender_name,setsender_name]=useState('')
    const [sender_email,setsender_email]=useState('')
    const [sender_address,setsender_address]=useState('')
    const [sender_phone,setsender_phone]=useState('')
    const [sender_state,setsender_state]=useState('')
    const [sender_city,setsender_city]=useState('')
    const [sender_zip,setsender_zip]=useState('')


    const onCheckout = () => {


        if(Receiver_name == '' || null ){
            toast.error('Please Enter Receiver Name', {autoClose:2000})

        }
        else if(Receiver_phone == '' || null){
            toast.error('Please Enter Receiver Phone', {autoClose:2000})

        }
        else if(Receiver_address == '' || null){
            toast.error('Please Enter Receiver Address', {autoClose:2000})

        }
        else if(Receiver_city == '' || null){
            toast.error('Please Enter Receiver City', {autoClose:2000})

        }
        else if(Receiver_state == '' || null){
            toast.error('Please Enter Receiver State', {autoClose:2000})

        }
        else if(Receiver_country == '' || null){
            toast.error('Please Enter Receiver Country', {autoClose:2000})

        }
        else if(sender_name == '' || null){
            toast.error('Please Enter Sender Name', {autoClose:2000})

        }
        else if(sender_email == '' || null){
            toast.error('Please Enter Sender Email', {autoClose:2000})

        }
        else if(sender_address == '' || null){
            toast.error('Please Enter Sender Address', {autoClose:2000})

        }
        else if(sender_phone == '' || null){
            toast.error('Please Enter Sender Phone', {autoClose:2000})

        }
        else if(sender_city == '' || null){
            toast.error('Please Enter Sender City', {autoClose:2000})

        }
        else if(sender_state == '' || null){
            toast.error('Please Enter Sender State', {autoClose:2000})

        }
        else if(sender_zip == '' || null){
            toast.error('Please Enter Sender Zip', {autoClose:2000})

        }
        else{
            buildOrderObject();
        }
        
       
        // getStripeIntent();


      }

      const buildOrderObject = async () => {
       

        const obj = {
            email: sender_email,
            phone: sender_phone,
            address: sender_address,
            name: sender_name,
            pincode: sender_zip,
            state: sender_state,
            city: sender_city,
            userid: "68356b65-998a-4a29-aa1e-5b6ec4319537",
          };

   
        const order = {
          userID: '123',
          phone: Receiver_phone,
          name: Receiver_name,
          address: Receiver_address,
          city: Receiver_city,
          country: Receiver_country,
          state:Receiver_state,
          senderAddress: JSON.stringify(obj),
          isSender:true,
          Products:JSON.stringify(cartItems),
          Status: 'Orderd',
        };
        console.log("mkvf"+JSON.stringify(order));
        try {
          const authUser = await Auth.currentAuthenticatedUser();
          // alert(JSON.stringify(authUser))
          console.log('authUser',authUser)
          console.log('sub-1',authUser?.attributes?.sub)
          order.userID = authUser?.attributes?.sub;
          const res = await API.graphql(
            graphqlOperation(createOrder, {input: order}),
          );
          console.log('Build Order Response: ', res);
        //   orderDetails = res;

      getStripeIntent(order.userID)



        } catch (error) {

            alert(error)
    
        }


     
      };
 
    const [coupon, setCoupon] = useState(false);
    const openCoupon = () => {
        setCoupon(!coupon);
    };

    const cartItems = useSelector((state) => state.cart.items);

    const initialValue = 0;
    const SubTotal = cartItems.reduce(
        (accumulator, current) =>
            accumulator + current.price * current.quantity,
        initialValue
    );

    const getStripeIntent = async (userid) => {

        
        const region = await localStorage.getItem('regoin');
        const payload = {
            region:region,
          event: {
            name: Receiver_name,
            address: Receiver_address,
            postal_code:  '160019',
            city: Receiver_city,
            state: Receiver_state,
            country: Receiver_country,
            userid:userid,
            product: {
                amount: Math.round(Number(SubTotal) * 100),
                des: 'one',
            },
          },
        };
        console.log('payload is = '+ JSON.stringify(payload))

        const body = JSON.stringify(payload);

        fetch(CHECKOUT_API_URL, {
            method: 'POST',
            headers: {  'Content-Type': 'application/json'
            },
            body: body,  
            })
            .then(res => res.json())
            .then(res => {
                console.log("res  : "+res);
                const data = JSON.parse(res.data);
                console.log("hgfyc"+JSON.stringify(data));  
            setclient_secret(data.client_secret)
            // stripe=loadStripe(data?.publishableKey)
            // alert('hgjys')


            callChildFunctionWithData(data)

     
            // callChildFunction(data.data.client_secret)
            })
            .catch(error => {
               console.log("err : "+error);
              })

    
        
    };

    return (
<>


        <div className="checkout border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]">
            {cartItems.length <= 0 && <EmptyCheckout />}
            {cartItems.length <= 0 ||
                (initialValue === 0 && (
                    <>
                       
                        <div className="checkout-wrap pt-[25px]">
                            <div className="container">
                                <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[50px]">
                                    <div className="lg:col-span-7 col-span-12">
                                        <div className="billing">
                                            <h2 className="title text-[18px] mb-[20px]">
                                               Receiver Details
                                            </h2>
                                            {/* <form className="billing-form"> */}
                                            <form className="Receiver-form">
                                                <div className="group-field flex mb-[20px]">
                                                    <div
                                                        className={`${singleField} mr-[25px]`}
                                                    >
                                                        <label
                                                            htmlFor="billing-firstname"
                                                            className="mb-[5px]"
                                                        >
                                                            Receiver Full Name
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            value={Receiver_name}
                                                            onChange={(event)=>{ setReceiver_name(event.target.value)}}
                                                        />
                                                    </div>
                                                    <div
                                                        className={`${singleField}`}
                                                    >
                                                        <label
                                                            htmlFor="Receiver-phone"
                                                            className="mb-[5px]"
                                                        >
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="Receiver-phone"
                                                            value={Receiver_phone}
                                                            onChange={(event)=>{ setReceiver_phone(event.target.value)}}
                                                        />
                                                    </div>
                                                </div>

                                              
                                                
                                                <div
                                                    className={`${singleField} mb-[20px]`}
                                                >
                                                    <label
                                                        htmlFor="billing-companyname"
                                                        className="mb-[5px]"
                                                    >
                                                       Street Address
                                                    </label>
                                                    <input
                                                        className={`${inputField}`}
                                                        type="text"
                                                        id="Receiver-address"
                                                        value={Receiver_address}
                                                        onChange={(event)=>{ setReceiver_address(event.target.value)}}
                                                        />
                                                </div>

                                                <div
                                                    className={`${singleField} mb-[20px]`}
                                                >
                                                    <label
                                                        htmlFor="billing-companyname"
                                                        className="mb-[5px]"
                                                    >
                                                     State/Province/Zoba
                                                    </label>
                                                    <input
                                                        className={`${inputField}`}
                                                        type="text"
                                                        id="Receiver-state"
                                                        value={Receiver_state}
                                                        onChange={(event)=>{ setReceiver_state(event.target.value)}}
                                                    />
                                                </div>

                                                <div className="group-field flex mb-[20px]">
                                                    <div
                                                        className={`${singleField} mr-[25px]`}
                                                    >
                                                        <label
                                                            htmlFor="billing-firstname"
                                                            className="mb-[5px]"
                                                        >
                                                            City
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="Receiver-city"
                                                            value={Receiver_city}
                                                            onChange={(event)=>{ setReceiver_city(event.target.value)}}
                                                            />
                                                    </div>

                                                    <div
                                                        className={`${singleField} mr-[25px]`}
                                                    >
                                                        <label
                                                            htmlFor="billing-firstname"
                                                            className="mb-[5px]"
                                                        >
                                                            Country
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="Receiver-city"
                                                            value={Receiver_country}
                                                            onChange={(event)=>{ setReceiver_country(event.target.value)}}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </form>
                                        </div>


                                        <div className="billing">
                                            <h2 className="title text-[18px] mb-[20px]">
                                              Sender Detail's
                                            </h2>
                                            {/* <form className="billing-form" style={{padding:10, borderRadius:10,borderWidth:0.4}}> */}
                                            <form className="sender-form" style={{padding:10, borderRadius:10,borderWidth:0.4}}>
                                                <div className="group-field flex mb-[20px]">
                                                    <div
                                                        className={`${singleField} mr-[25px]`}
                                                    >
                                                        <label
                                                            htmlFor="billing-firstname"
                                                            className="mb-[5px]"
                                                        >
                                                            Full Name
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="sender-firstname"
                                                            value={sender_name}
                                                            onChange={(event)=>{ setsender_name(event.target.value)}}

                                                        
                                                        />
                                                    </div>
                                                    <div
                                                        className={`${singleField}`}
                                                    >
                                                        <label
                                                            htmlFor="billing-lastname"
                                                            className="mb-[5px]"
                                                        >
                                                           Email
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="sender-email"
                                                            value={sender_email}
                                                            onChange={(event)=>{ setsender_email(event.target.value)}}
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${singleField} mb-[20px]`}
                                                >
                                                    <label
                                                        htmlFor="billing-companyname"
                                                        className="mb-[5px]"
                                                    >
                                                      Full Address
                                                    </label>
                                                    <input
                                                        className={`${inputField}`}
                                                        type="text"
                                                        id="sender-addresss"
                                                        value={sender_address}
                                                        onChange={(event)=>{ setsender_address(event.target.value)}}
                                                        />
                                                </div>


                                                <div className="group-field flex mb-[20px]">
                                                    <div
                                                        className={`${singleField} mr-[25px]`}
                                                    >
                                                        <label
                                                            htmlFor="billing-firstname"
                                                            className="mb-[5px]"
                                                        >
                                                            Phone
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="billing-firstname"
                                                            value={sender_phone}
                                                            onChange={(event)=>{ setsender_phone(event.target.value)}}
                                                            />
                                                    </div>
                                                    <div
                                                        className={`${singleField}`}
                                                    >
                                                        <label
                                                            htmlFor="billing-lastname"
                                                            className="mb-[5px]"
                                                        >
                                                         City
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="billing-lastname"
                                                            value={sender_city}
                                                            onChange={(event)=>{ setsender_city(event.target.value)}}
                                                        />
                                                    </div>
                                                </div>



                                                
                                                <div className="group-field flex mb-[20px]">
                                                    <div
                                                        className={`${singleField} mr-[25px]`}
                                                    >
                                                        <label
                                                            htmlFor="billing-firstname"
                                                            className="mb-[5px]"
                                                        >
                                                            State
                                                        </label>
                                                        <input
                                                        className={`${inputField}`}
                                                        type="text"
                                                        id="billing-companyname"
                                                        value={sender_state}
                                                        onChange={(event)=>{ setsender_state(event.target.value)}}
                                                        />
                                                    </div>
                                                    <div
                                                        className={`${singleField}`}
                                                    >
                                                        <label
                                                            htmlFor="billing-lastname"
                                                            className="mb-[5px]"
                                                        >
                                                           Zip code
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="billing-lastname"
                                                            value={sender_zip}
                                                            onChange={(event)=>{setsender_zip(event.target.value)}}
                                                            />
                                                    </div>
                                                </div>



                                                {/* <div className="group-field flex mb-[20px]">
                                                <div
                                                    className={`${singleField} mb-[20px]`}
                                                >
                                                    <label
                                                        htmlFor="billing-companyname"
                                                        className="mb-[5px]"
                                                    >
                                                     State
                                                    </label>
                                                    <input
                                                        className={`${inputField}`}
                                                        type="text"
                                                        id="billing-companyname"
                                                        value={sender_state}
                                                        onChange={(event)=>{ setsender_state(event.target.value)}}
                                                        />
                                                </div>
                                                    <div
                                                        className={`${singleField}`}
                                                    >
                                                        <label
                                                            htmlFor="billing-lastname"
                                                            className="mb-[5px]"
                                                        >
                                                        Zip code
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            id="billing-lastname"
                                                            value={sender_zip}
                                                            onChange={(event)=>{setsender_zip(event.target.value)}}
                                                            />
                                                    </div>
                                                </div> */}

                                               

                                              
                                            </form>

                                        </div>
                                    </div>
                                    <div className="lg:col-span-5 col-span-12">
                                        <div className="order-info">
                                            <div className="inner bg-[#f6f6f6] border border-[#bfbfbf] p-[40px_45px_50px]">
                                                <h2 className="title text-[18px] mb-[20px]">
                                                    Your order
                                                </h2>
                                                <table className="w-full text-sm text-left">
                                                    <thead className="text-[18px] bg-[#f4f5f7]">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="font-normal py-3"
                                                            >
                                                                Product
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="font-normal py-3 text-right"
                                                            >
                                                                Total
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="border-t border-[#cdcdcd]">
                                                        {cartItems?.map(
                                                            (item) => (
                                                                <tr
                                                                    className="border-t border-[#cdcdcd]"
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <th
                                                                        scope="row"
                                                                        className="py-[15px] font-normal whitespace-nowrap"
                                                                    >
                                                                        {
                                                                            item.name
                                                                        }{' '}
                                                                        X
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </th>
                                                                    <td className="py-[15px] text-right">
                                                                        
                                                                        {item.price}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                        <tr className="border-t border-[#cdcdcd]">
                                                            <th
                                                                scope="row"
                                                                className="py-[15px] font-bold whitespace-nowrap"
                                                            >
                                                                Subtotal
                                                            </th>
                                                            <td className="py-[15px] text-right">
                                                                
                                                                {SubTotal}
                                                            </td>
                                                        </tr>
                                                        <tr className="border-t border-[#cdcdcd]">
                                                            <th
                                                                scope="row"
                                                                className="py-[15px] font-bold whitespace-nowrap"
                                                            >
                                                                Total
                                                            </th>
                                                            <td className="py-[15px] text-right">
                                                                
                                                                {SubTotal}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="check pt-[30px] border-t border-[#cdcdcd]">

                                                <Elements stripe={stripePromise} options={options}>

                                                                                          
                                                        <CheckoutForm 

                                                        ref={childRef} 
                                                      
                                                        />

                                             
                                                    </Elements>

                                                <form onSubmit={()=> {handlesubmit}}>


                                              
                                             {/* <button style={{backgroundColor:'#0047AB',width:'100%', marginTop:15, borderRadius:7, color:'white', padding:10}} >
                                                    Place Order
                                                    </button> */}
                                                </form>
                                                    {/* <div className="payment-info pb-[20px]">
                                                        <h2 className="text-[18px] mb-[10px]">
                                                            {
                                                                checkoutItems[0]
                                                                    ?.checkTitle
                                                            }
                                                        </h2>
                                                        <p>
                                                            {
                                                                checkoutItems[0]
                                                                    ?.checkDesc
                                                            }
                                                        </p>
                                                    </div> */}
                                                    {/* <div className="payment-info">
                                                        <h2 className="text-[18px] mb-[10px]">
                                                            {
                                                                checkoutItems[0]
                                                                    ?.paymentTitle
                                                            }
                                                        </h2>
                                                        <p>
                                                            {
                                                                checkoutItems[0]
                                                                    ?.paymentDesc
                                                            }
                                                        </p>
                                                    </div> */}
                                                </div>
                                            </div>
                                            <p className="pt-[35px]">
                                                {checkoutItems[0]?.additionDesc}
                                                <Link href="/privacy">
                                                    <a className="ml-[5px]">
                                                        {
                                                            checkoutItems[0]
                                                                ?.privacyText
                                                        }
                                                    </a>
                                                </Link>
                                            </p>
                                            <div className="payment-btn-wrap pt-[35px]">                                               
                                {/* <button onClick={()=> {onCheckout()}}>Place order TEst</button> */}
                                                <button 
                                                    onClick={()=> { onCheckout()}}
                                                    //  onClick={() => {callChildFunction('vnslvss')}}
                                                    className="bg-[#222222] text-white w-full px-[42px] h-[46px] leading-[44px]"
                                                    type="submit"
                                                >
                                                    {
                                                        checkoutItems[0]
                                                            ?.orderBtnText
                                                    }
                                                </button>




                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </>
                ))}
        </div>
        </>
    );
}

Checkout.propTypes = {
    checkoutItems: PropTypes.instanceOf(Object).isRequired,
};

export default Checkout;
