import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IoCheckmarkCircle } from 'react-icons/io5';
import EmptyCheckout from './EmptyCheckout';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {createOrder} from '../../graphql/mutations';

const singleField = `flex flex-col w-full`;
const inputField = `border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full h-[50px]`;
const textareaField = `border border-[#e8e8e8] focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full min-h-[120px]`;
const secondaryButton =
    'flex bg-secondary text-white leading-[38px] text-[15px] h-[40px] px-[32px]';

const isInitial = true;
let productDetails;

function Checkout({ checkoutItems }) {
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
      
        buildOrderObject();
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

   
        const d = [{country:"Eritrea",image:"https://appimagesabrehet.s3.amazonaws.com/orange.png",images:"https://appimagesabrehet.s3.amazonaws.com/orange.png",cost:"$2.34",description:"Serrano/ ጉዕ per kilo we deliver to Asmara, Mendefera, Keren, Massawa, Barentu, Dekemhare, Teseney, Adi Quala, Akurdet, Adikeigh, Senafe, and Segheneyti.",title:"Orangez ኣራንሺ",content:{country:"Eritrea",image:"https://appimagesabrehet.s3.amazonaws.com/orange.png",images:"https://appimagesabrehet.s3.amazonaws.com/orange.png",cost:"$2.34",price:"$3.99",description:"Serrano/ ጉዕ per kilo we deliver to Asmara, Mendefera, Keren, Massawa, Barentu, Dekemhare, Teseney, Adi Quala, Akurdet, Adikeigh, Senafe, and Segheneyti.",title:"Orange/ ኣራንሺ"},createdAt:"2022-05-30T20:14:23.315Z",price:"$3.99",qty:1,id:"Eri7.33",category:"GroceriesEritrea",updatedAt:"2022-05-30T20:14:23.315Z"}]
            const y= {email:"byguuguy",phone:"ygjctyugvc",address:"Vgcfgjvch",name:"Vvvbby",pincode:"Grudge",state:"ftycfuygvh",city:"Ytugvt",userid:"68356b65-998a-4a29-aa1e-5b6ec4319537"}
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


        //   senderDetails = JSON.parse(res?.data?.createOrder.senderAddress);
    
          // setorderDetails(res);
          // setSenderDetails(JSON.parse(res?.data?.createOrder.senderAddress));
    
        //   dispatch(
        //     handleOrdersComplete({
        //       orderData: cartItems,
        //     }),
        //   );
    
        //   console.log('Order Detials in cartItemData: ', cartItems);
        //   productDetails = cartItems;
        } catch (error) {

            alert(error)
    
        }
      };
    
      const getStripeIntent = async () => {


       

    
            const total = cartItems.reduce((total, item) => {

                alert(JSON.stringify(item))
              let price = item?.price?.replace(/[\s,]/g, "")?.slice(1);
              price = Number(price) * item.qty;
              let newTotal = total + price;
              console.log("price: ", price);
              console.log("newTotal ", newTotal);
              return newTotal;
            }, 0);
        
        
            console.log("Valueeeee: ", Math.round(Number(total) * 100))
        
            // const region = await AsyncStorage.getItem('SERVER');
            const payload = {
              event: {
                name: Receiver_name,
                address: Receiver_address,
                postal_code:  '160019',
                city: Receiver_city,
                state: Receiver_state,
                country: Receiver_country,
                userid:'68356b65-998a-4a29-aa1e-5b6ec4319537',
                product: {
                  amount: Math.round(Number(total) * 100),
                  des: 'some description',
                },
              },
            };
        
            const body = JSON.stringify(payload);
        
            console.log('payload is = '+ JSON.stringify(payload))
        
            
            
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

    return (
        <div className="checkout border-b border-[#ededed] lg:py-[90px] md:py-[80px] py-[50px]">
            {cartItems.length <= 0 && <EmptyCheckout />}
            {cartItems.length <= 0 ||
                (initialValue === 0 && (
                    <>
                        {/* <div className="customer-info">
                            <div className="container">
                                <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[30px]">
                                    <div className="xl:col-span-7 lg:col-span-6 col-span-12">
                                        <div className="customer-zone flex items-center bg-[#f4f5f7] p-[14px_30px_14px]">
                                            <div className="icon text-green-500 mr-[10px]">
                                                <IoCheckmarkCircle />
                                            </div>
                                            <h2 className="title text-[16px] leading-[28px] max-sm:whitespace-nowrap max-sm:text-ellipsis overflow-hidden">
                                                {
                                                    checkoutItems[0]
                                                        ?.customerzoneTitle
                                                }
                                                <button
                                                    type="button"
                                                    className="ml-[5px] transition-all hover:text-primary"
                                                    onClick={
                                                        openReturningCustomer
                                                    }
                                                >
                                                    {
                                                        checkoutItems[0]
                                                            ?.customerzoneBtnText
                                                    }
                                                </button>
                                            </h2>
                                        </div>
                                        {returningCustomer && (
                                            <div className="returning-form-wrap border border-[#dddddd] p-[30px] mt-[30px]">
                                                <p className="text-[#777777] text-[16px] font-normal mb-[20px]">
                                                    {
                                                        checkoutItems[0]
                                                            ?.customerzoneDesc
                                                    }
                                                </p>
                                                <form className="returning-form">
                                                    <div
                                                        className={`${singleField}  mb-[20px]`}
                                                    >
                                                        <label
                                                            htmlFor="returning-email"
                                                            className="mb-[5px]"
                                                        >
                                                            Username or email *
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="email"
                                                            id="returning-email"
                                                        />
                                                    </div>
                                                    <div
                                                        className={`${singleField}  mb-[20px]`}
                                                    >
                                                        <label
                                                            htmlFor="returning-password"
                                                            className="mb-[5px]"
                                                        >
                                                            Password *
                                                        </label>
                                                        <input
                                                            className={`${inputField}`}
                                                            type="password"
                                                            id="returning-password"
                                                            placeholder="Password"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className={`${secondaryButton}`}
                                                    >
                                                        Login
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                    <div className="xl:col-span-5 lg:col-span-6 col-span-12">
                                        <div className="coupon-zone flex items-center bg-[#f4f5f7] p-[14px_30px_14px]">
                                            <div className="icon text-green-500 mr-[10px]">
                                                <IoCheckmarkCircle />
                                            </div>
                                            <h2 className="title text-[16px] leading-[28px] max-sm:whitespace-nowrap max-sm:text-ellipsis overflow-hidden">
                                                {
                                                    checkoutItems[0]
                                                        ?.couponZoneTitle
                                                }

                                                <button
                                                    type="button"
                                                    className="ml-[5px] transition-all hover:text-primary"
                                                    onClick={openCoupon}
                                                >
                                                    {
                                                        checkoutItems[0]
                                                            ?.couponZoneBtnText
                                                    }
                                                </button>
                                            </h2>
                                        </div>
                                        {coupon && (
                                            <div className="returning-form-wrap border border-[#dddddd] p-[30px] mt-[30px]">
                                                <p className="text-[#777777] text-[16px] font-normal mb-[20px]">
                                                    {
                                                        checkoutItems[0]
                                                            ?.returningFormDesc
                                                    }
                                                </p>
                                                <form className="returning-form">
                                                    <div
                                                        className={`${singleField}  mb-[20px]`}
                                                    >
                                                        <input
                                                            className={`${inputField}`}
                                                            type="text"
                                                            placeholder="Coupon code"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className={`${secondaryButton} transition-all hover:bg-primary hover:text-white`}
                                                    >
                                                        {
                                                            checkoutItems[0]
                                                                ?.returningBtnText
                                                        }
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
                                                </div>

                                               

                                              
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
                                                <button 
                                                    onClick={()=> { onCheckout() }}
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
    );
}

Checkout.propTypes = {
    checkoutItems: PropTypes.instanceOf(Object).isRequired,
};

export default Checkout;
