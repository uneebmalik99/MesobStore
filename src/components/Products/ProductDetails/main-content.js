import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { IoAddSharp, IoHeartOutline, IoRemoveSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart/cart-slice';
import { wishlistActions } from '../../../store/wishlist/wishlist-slice';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Tailwind Related Stuff
const soldOut = `bg-black text-white block leading-[28px] absolute top-[15px] right-[15px] px-[15px] z-[1]`;
const bestSeller = `bg-[#f14705] text-[14px] text-white block rounded-full absolute top-[15px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const productOffer = `bg-[#98d8ca] text-[14px] text-white block rounded-full absolute top-[70px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const qtybutton = `cursor-pointer text-center absolute w-[24px] leading-[23px]`;
const qtyButtonWrap = `relative inline-flex border border-[#dddddd]`;
const addtoCartBtn = `bg-black text-white px-[42px] h-[46px] leading-[44px]`;
const wishlistBtn = `border border-[#dddddd] text-[20px] w-[46px] h-[46px] leading-[46px] inline-flex justify-center items-center transition-all hover:text-primary`;

function MainContent({ product }) {
    const {
        id,
        title,
        price,
        image, 
        desc,
        category,
        newprice,
        isRecommended,
        off_percentage
    } = product;
    const [quantityCount, setQuantityCount] = useState(1);

    console.log('kjefsbbeubsu',newprice);
    console.log('kjefsbbeubsu',off_percentage);
    console.log('kjefsbbeubsu',isRecommended);
    const [ priceAfterDiscount , setpriceAfterDiscount ] = useState('')

    const dispatch = useDispatch();
    const addToCartHandler = () => {
      
      let priceAfterDiscountv ;
       let tprice = price.replace('$', ''); // This removes the dollar sign
       tprice = tprice.replace(/,/g, '');
    
       if(isRecommended == 'true' && off_percentage != null ){
       
            let off  = off_percentage.slice(0, -1);

            let discount = (off / 100) * tprice;
          priceAfterDiscountv = (tprice - discount).toFixed(2);

            console.log('njhg', priceAfterDiscountv);

            setpriceAfterDiscount(priceAfterDiscountv)
    }
    
       let  totalprice =tprice*quantityCount;
    //    console.log("totalPrice: " + tprice*quantityCount);
    //    console.log("nvhfj: " + "jsvndjn"+tprice);
       dispatch(
            cartActions.addItemToCart({
                id,
                title,
                country:product.country,
                category:product.category,
                price:priceAfterDiscountv,
                quantity: quantityCount,
                totalPrice: totalprice,
                image: product.image,
                slug: `/products/${product?.slug}`,
            })
        );
        toast.success('Added to Cart', {autoClose:2000})

     


    };
  

    const addToWishlistHandler = () => {
        dispatch(
            wishlistActions.addItemToWishlist({
                id,
                title,
                price,
                totalPrice,
                image: `/images/products/${product?.slug}/${product?.xsImage}`,
                slug: `/products/${product?.slug}`,
            })
        );
    };

    return (
        <div className="product-detail border-b border-[#ededed] md:py-[90px] py-[50px]">
              

            <div className="container">
                <div className="grid grid-cols-12 lg:gap-x-[25px] max-md:gap-y-[25px]">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="product-detail-img relative">
                        
                            <img
                                className="w-full"
                                src={product.image}
                                style={{borderRadius:10}}
                                // src={`/images/products/${product?.slug}/${product?.mdImage}`}
                                alt={product?.altImage}
                                width={585}
                                height={585}
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-6 col-span-12">
                        <div className="product-detail-content">
                            <h3 className="mb-[10px]">{title}</h3>





                            {/* {off_percentage != null?

                          
                            <div style={{position:'absolute',height:30, width:30,display:'flex', justifyContent:'center',alignContent:'center'
                                        ,alignItems:'center', backgroundColor:'green',marginTop:-25,marginLeft:-10, borderRadius:'50%'}}>
                                                <p style={{color:'white',fontWeight:700, fontSize:10}}>{off_percentage}</p>
                                            </div>

                                            :null} */}
                          
                          
                          {isRecommended == 'true' && off_percentage != null ?
                       <>
                       <p className="product-price" style={{fontSize:12, textDecorationLine:'line-through',  textDecorationColor: "black" }} >

                            Was: {product.price}
                            </p>
                             <p className="product-price" style={{color:'green', fontWeight:700}}>
                             New Price: {newprice}
                             </p>
         
                             </>
                            :
                            <span className="product-price text-[30px] leading-[42px] text-[#999999] mb-[25px]">
                            {price}
                        </span>
                      }
                          
                            {/* {price && (
                                <span className="product-price text-[30px] leading-[42px] text-[#999999] mb-[25px]">
                                    {price}
                                </span>
                            )} */}
                            

                            <p className="text-[14px] leading-[24px] lg:max-w-[450px]">
                                {desc}
                            </p>
                            <div className="group-btn flex py-[30px]">
                                <div className={`${qtyButtonWrap} mr-[15px]`}>
                                    <div className="flex justify-center w-[120px]">
                                        <button
                                            type="button"
                                            className={`${qtybutton} dec top-1/2 -translate-y-1/2 left-[4px]`}
                                            onClick={() =>
                                                setQuantityCount(
                                                    quantityCount > 1
                                                        ? quantityCount - 1
                                                        : 1
                                                )
                                            }
                                        >
                                            <IoRemoveSharp />
                                        </button>
                                        <input
                                            className="qty-input outline-none text-center w-[100px] px-[15px] h-[46px] leading-[40px]"
                                            type="text"
                                            name="qtybutton"
                                            value={quantityCount}
                                            onChange={(e) => {
                                                const userInput = Number(
                                                    e.target.value
                                                );
                                                if (
                                                    userInput.toString() !==
                                                    'NaN'
                                                ) {
                                                    setQuantityCount(userInput);
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className={`${qtybutton} inc top-1/2 -translate-y-1/2 right-[4px]`}
                                            onClick={() =>
                                                setQuantityCount(
                                                    quantityCount >= 0
                                                        ? quantityCount + 1
                                                        : quantityCount
                                                )
                                            }
                                        >
                                            <IoAddSharp />
                                        </button>
                                    </div>
                                </div>
                                <div
                                  
                                >
                                    <button
                                        type="button"
                                        className={`${addtoCartBtn}
                                       
                                         mr-[15px]`}
                                        onClick={addToCartHandler}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                               
                            </div>
                            <div className="other-info">
                                
                                <div className="category-wrap font-medium">
                                    <span>Category: </span>
                                    <span className="text-[#666666] ml-[5px]">
                                        {category}
                                    </span>
                                </div>
                                <div className="sku-wrap font-medium">
                                    <span>Description: </span>
                                    <span className="text-[#666666] ml-[5px]">
                                        {product?.desc}
                                    </span>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

MainContent.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
};

export default MainContent;
