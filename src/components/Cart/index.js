import PropTypes from 'prop-types';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import CartItem from './CartItem';
import { ScrollView } from '@aws-amplify/ui-react';

const minicartGroupBtn = `flex items-center justify-center border border-[#222222]  w-full h-[50px]`;
function Cart({ minicart, showMiniCart }) {
    const [userauth ,setuserauth ] = useState(false)
    const cartItems = useSelector((state) => state.cart.items);

    const initialValue = 0;
    // console.log("vdvds"+JSON.stringify(cartItems));
    // console.log('jbfjd'+cartItems.length)
    // const totalfunc = () => {
    //     for(let i = 0; i<cartItems.length ; i++ ){
    //         let pt  = cartItems; // Remove the dollar sign
    //         console.log("kdfnnf"+i);
    //         initialValue = initialValue+cartItems[i].totalPrice


    //     }
    //     setSubTotal(initialValue)
    //     // alert(initialValue)
    // }
    const SubTotal = cartItems.reduce(
        (accumulator, current) =>
            accumulator +  current.price * current.quantity,
        initialValue
    );

    

    async function currentSession() {

    try {
        const data = await Auth.currentSession();
        // console.log("dddd "+data);
        if(data){
            setuserauth(true)
            // console.log("data user  "+JSON.stringify(data));
        }
        
    } catch(err) {
        setuserauth(false)

        // console.log("data "+err);
    }
    };

    useEffect(() => {
        currentSession()
        
    //  totalfunc()
    }, []);



    return (
        <div
            className={minicart ? 'minicart-area active' : 'minicart-area'}
            onClick={showMiniCart}
        >
            <div
                className="minicart-inner"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="minicart-top ml-[-8px]">
                    <IoCloseOutline
                        className="text-[#212121] text-[32px] cursor-pointer"
                        onClick={showMiniCart}
                    />
                </div>
                <div className="minicart-body pt-[25px]">
                    <div className="minicart-container">
                        {cartItems.length <= 0 && (
                            <h2 className="text-[20px]">
                                Your cart is currently empty.
                            </h2>
                        )}





                        <ul className="overflow-auto max-h-[480px]" style={{ borderBottom: '2px solid #ccc' }}>
                            
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={{
                                        id: item.id,
                                        title: item.name,
                                        quantity: item.quantity,
                                        total: item.totalPrice,
                                        price: item.price,
                                        slug: item.slug,
                                        image: item.image,
                                    }}
                                />
                            ))}
                        </ul>
                        
                        {cartItems.length <= 0 ||
                            (initialValue === 0 && (
                                <>
                                <div className='w-full'  style={{backgroundColor:'white', padding:'4%', position: 'absolute', bottom:0,left:0,}}>

                               
                                    <div className="minicart-subtotal flex justify-between text-[24px] font-medium pt-[40px]">
                                        <span>Subtotal:</span>
                                        <span>${SubTotal.toFixed(2)}</span>

                                    </div>
                                    <ul className="minicart-group-btn pt-[40px]">
                                        <li className="mb-[15px]">
                                            <Link href="/cart">
                                                <a
                                                    className={`${minicartGroupBtn} transition-all duration-500 hover:bg-[#222222] hover:text-white`}
                                                >
                                                    View cart
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            {userauth === true?
                                             <li >
                                                  <Link href="/checkout">
                                                  <div
                                                      className={`${minicartGroupBtn} bg-[#222222] text-white`}
                                                  >
                                                      Checkout
                                                  </div>
                                              </Link>
                                              </li>
                                              :
                                              <Link href="/auth">
                                              <div
                                                  className={`${minicartGroupBtn} bg-[#222222] text-white`}
                                              >
                                                  Checkout
                                              </div>
                                          </Link>

                                            }
                                          
                                        </li>
                                    </ul>

                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

Cart.propTypes = {
    minicart: PropTypes.bool.isRequired,
    showMiniCart: PropTypes.func.isRequired,
};

export default Cart;
