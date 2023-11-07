import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import Link from 'next/link';
import {
    IoAddSharp,
    IoBagHandleOutline,
    IoPricetagOutline,
    IoHeartOutline,
    IoRemoveSharp,
} from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import QuickView from '../QuickView';

import { cartActions } from '../../store/cart/cart-slice';
import { filterActions } from '../../store/product-filter/filter-slice';
import { wishlistActions } from '../../store/wishlist/wishlist-slice';
import { Alert } from '@aws-amplify/ui-react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Tailwind Related Stuff
const addAction =
    'flex justify-center absolute w-full top-1/2 left-auto transform -translate-y-1/2 z-[1]';
const addActionButton =
    'bg-white rounded-full flex justify-center items-center text-[21px] w-[45px] h-[45px] leading-[48px] hover:text-primary transition-all opacity-0 invisible ease-in-out transform translate-y-20 duration-[.5s] group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible';
const soldOut = `bg-black text-white block leading-[28px] absolute top-[15px] right-[15px] px-[15px] z-[1]`;
const bestSeller = `bg-[#f14705] text-[14px] text-white block rounded-full absolute top-[15px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const productOffer = `bg-[#98d8ca] text-[14px] text-white block rounded-full absolute top-[70px] left-[15px] w-[45px] h-[45px] leading-[45px] text-center z-[1]`;
const qtybutton = `cursor-pointer text-center absolute w-[24px] leading-[23px]`;
const qtyButtonWrap = `relative inline-flex border border-[#dddddd]`;
const addtoCartBtn = `bg-black text-white px-[42px] h-[46px] leading-[44px]`;
const wishlistBtn = `border border-[#dddddd] text-[20px] w-[46px] h-[46px] leading-[46px] inline-flex justify-center items-center transition-all hover:text-primary`;
const textHover = `transition-all hover:text-primary`;

function ProductItem({ product, productFilter, productFilterPath ,headerItems, selleremail}) {
    const {
        id,
        title,
        price,
        discountPrice,
        image,
        content,
        category,
        totalPrice,
        soldOutSticker,
        isRecommended,
        off_percentage,
        bestSellerSticker,
        offerSticker,
        desc,
    } = product;


    console.log("produdwfwfsfdvsrect"+ JSON.stringify(headerItems));

    console.log("produdwfwfrect"+JSON.stringify(product));

    const productImageSrc = `/images/products/${product?.slug}/${product?.smImage}`;

    const [isOpen, setIsOpen] = useState(false);

    const [quantityCount, setQuantityCount] = useState(1);

    const [ priceAfterDiscount , setpriceAfterDiscount ] = useState('')

    const dispatch = useDispatch();
    const addToCartHandler = () => {
        let tprice = price.replace('$', ''); // This removes the dollar sign
        tprice = tprice.replace(/,/g, '');
        console.log("totalPricetofsfgtalPrice "+tprice );
        let final_price ;
        if(isRecommended == true && off_percentage != null ){
            let tpricee = price.slice(1)
            tpricee = tpricee.replace(/,/g, '');
            let off  = off_percentage.slice(0, -1);
            let discount = (off / 100) * tpricee;
            let priceAfterDiscountv = (tpricee - discount).toFixed(2);
            final_price  = priceAfterDiscountv
            setpriceAfterDiscount(priceAfterDiscountv)
        }else{
            final_price  = tprice
        }
       let cost = content.cost
        console.log("totalPrice: " + tprice*quantityCount);
        console.log("totalPricetotalPrice"+totalPrice);
       let  totalprice =tprice*quantityCount;
    //    alert('efwfwe',isRecommended)
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price:final_price,
                quantity: quantityCount,
                cost:cost,
                selleremail:selleremail,
                country:product.country,
                category:product.category,
                totalPrice:totalprice,
                image: product.image,

            
            })
        );
        toast.success('Added to Cart', {autoClose:2000})

    };

    const filterChangeHandler = (isAdd, data) => {
        if (isAdd) {
            dispatch(filterActions.addFilter(data));
        } else {
            dispatch(filterActions.removeFilter(data));
        }
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

    useEffect(() => {
        let tpricee;
        if(isRecommended == true && off_percentage != null ){
            tpricee = price.slice(1)
       
            tpricee = tpricee.replace(/,/g, '');
            let off  = off_percentage.slice(0, -1);

            let discount = (off / 100) * tpricee;
            let priceAfterDiscountv = (tpricee - discount).toFixed(2);

            console.log("ghvjhvjh",priceAfterDiscountv );

            setpriceAfterDiscount(priceAfterDiscountv)



        }else{
            setpriceAfterDiscount(tpricee)

        }
    }, []);

    return (
        <>
            <div className="product-item" >


                <div className="product-img relative group after:bg-[rgba(0,0,0,.1)] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:opacity-0 after:transition-all after:pointer-events-none hover:after:opacity-100">

                <Link
                 href={{
                    pathname: "/productdetails",
                    query:  {
                        id: product.id,
                        title: product.title,
                        image: product.image,
                        desc:product.desc,
                        headerItems:headerItems,
                        price:product.price,
                        newprice:priceAfterDiscount,
                        cost:content.cost,
                        category:product.category,
                        off_percentage:product.off_percentage,
                        isRecommended:product.isRecommended,
                        selleremail:selleremail

                   
                    } 
                  }}
        
          >

                
                        <a className="block" style={{borderRadius:10,}}>

       {product.off_percentage != null && product.isRecommended == true?

                          
<div style={{position:'absolute',height:30, width:30,display:'flex', justifyContent:'center',alignContent:'center'
                                        ,alignItems:'center', backgroundColor:'green',marginTop:-25,marginLeft:-10, borderRadius:'50%'}}>
                                                <p style={{color:'white',fontWeight:700, fontSize:10}}>{product.off_percentage}</p>
                                            </div>

                                            :null}
                           
                            <img
                                className="w-full"
                                src={product.image}
                                style={{borderRadius:10,height:180,  objectFit:'cover'}}
                                alt={product?.altImage}
                                
                             
                            />
                        </a>
                    </Link>

                    <div className={addAction}>
                        <button
                            type="button"
                            className={`${addActionButton} mr-[15px] group-hover:delay-[0s]`}
                            onClick={() => setIsOpen(true)}
                        >
                            <IoAddSharp />
                        </button>
                       
                    </div>
                </div>
                <div className="product-content text-center" >
                    <h3 className="mb-[5px]">
                    <Link
                    href={{
                        pathname: "/productdetails",
                        query:  {
                            id: product.id,
                            title: product.title,
                            price:product.price,
                            newprice:priceAfterDiscount,
                            image: product.image,
                            desc:product.desc,
                            cost:content.cost,
                            category:product.category,
                            off_percentage:off_percentage,
                            isRecommended:isRecommended,
                            selleremail:selleremail

                            
                       
                        } 
                      }}
                    
                    >
                            <a className="transition-all hover:text-primary text-[16px]">
                                {title}
                            </a>
                        </Link>
                    </h3>
                      {product.off_percentage != null && product.isRecommended == true?
                       <>
                       <p className="product-price" style={{fontSize:12, textDecorationLine:'line-through',  textDecorationColor: "black" }} >

                            Was: {price}
                            </p>
                             <p className="product-price" style={{color:'green', fontWeight:700}}>
                             New Price: {priceAfterDiscount}
                             </p>
         
                             </>
                            :
                            <h3>

                            <span className="product-price text-[18px] leading-[31px] text-[#666666]">
                               {price}
                            </span>
                            </h3>
                      }
                    
                      

                     {product.category  && (
                        <h7 >

                
                        <span className="text-[18px] leading-[31px] text-[#7B7D7D]">
                            {product.category}
                        </span>
                        </h7>
                    )}
                    
                </div>
            </div>




            <QuickView open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="quickview-body w-full md:h-full h-[700px] overflow-y-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="product-img md:h-full">
                            <Link href={`/products/${product?.slug}`}>
                                <a className="block relative md:h-full">
                                    {soldOutSticker && (
                                        <span
                                            className={`${
                                                soldOutSticker
                                                    ? `${soldOut}`
                                                    : ''
                                            }`}
                                        >
                                            {soldOutSticker}
                                        </span>
                                    )}
                                    {bestSellerSticker && (
                                        <span
                                            className={`${
                                                bestSellerSticker
                                                    ? `${bestSeller}`
                                                    : ''
                                            }`}
                                        >
                                            {bestSellerSticker}
                                        </span>
                                    )}
                                    {offerSticker && (
                                        <span
                                            className={`${
                                                offerSticker
                                                    ? `${productOffer}`
                                                    : ''
                                            }`}
                                        >
                                            {offerSticker}
                                        </span>
                                    )}
                                    <img
                                        className="w-full md:h-full md:object-cover"
                                        // src={`/images/products/${product?.slug}/${product?.mdImage}`}
                                        src={product.image}
                                        alt={product?.image}
                                        width={585}
                                        height={585}
                                    />
                                </a>
                            </Link>
                        </div>
                        <div className="product-content py-[40px] px-[30px]">
                            <h2 className="text-[24px] mb-[15px]">{title}</h2>
                           
                    {product.isRecommended == true  && product.off_percentage != null ?
                       <>
                       <p className="product-price" style={{fontSize:12, textDecorationLine:'line-through',  textDecorationColor: "black" }} >

                            Was: {product.price}
                            </p>
                             <p className="product-price" style={{color:'green', fontWeight:700}}>
                             New Price: {priceAfterDiscount}
                             </p>
         
                             </>
                            :
                            <span className="product-price text-[30px] leading-[42px] text-[#999999] block mb-[25px]">
                            {product.price}
                        </span>
                      }
                     
                            <p>{desc}</p>
                            <div className="group-btn flex max-xs:flex-wrap py-[30px]">
                                <div
                                    className={`${qtyButtonWrap} mr-[15px] max-xs:mb-[10px]`}
                                >
                                    <div className="flex justify-center lg:w-[120px] w-[100px]">
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
                                    className={`${
                                        soldOutSticker
                                            ? `cursor-not-allowed`
                                            : ''
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className={`${addtoCartBtn} ${
                                            soldOutSticker
                                                ? `pointer-events-none`
                                                : ''
                                        } mr-[15px]`}
                                        onClick={addToCartHandler}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                               
                            </div>
                         
                            <div className="sku-wrap font-medium">
                                <span>Country:</span>
                                <span className="text-[#666666] ml-[5px]">
                                    {product?.Country}
                                </span>
                            </div>

                            <div className="sku-wrap font-medium">
                                <span>Category:</span>
                                <span className="text-[#666666] ml-[5px]">
                                    {product?.category}
                                </span>
                            </div>
                            <div className="sku-wrap font-medium">
                                <span>Description:</span>
                                <span className="text-[#666666] ml-[5px]">
                                    {product?.desc}
                                </span>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </QuickView>
        </>
    );
}

ProductItem.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
    headerItems: PropTypes.instanceOf(Object).isRequired,
    productFilter: PropTypes.instanceOf(Object).isRequired,
    productFilterPath: PropTypes.string,
};

export default ProductItem;
