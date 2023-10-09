import Link from 'next/link';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { IoCloseOutline } from 'react-icons/io5';
import { cartActions } from '../../store/cart/cart-slice';

function CartItem({ item }) {

 
    const dispatch = useDispatch();

    const { image, slug,  country, category, title, quantity, price } = item;

    const removeItemFromCartHandler = (id) => {
        dispatch(cartActions.removeItemFromCart(id));
    };
    console.log("fssdvvd"+JSON.stringify(item));

    return (
        <li className="item flex items-start justify-between border-b border-[#dddddd] pb-[25px] mb-[20px] last:mb-0 last:pb-0 last:border-b-0">
            <div className="item-img">
               
                    <a className="product-img">
                        <img src={image} alt={title} />
                    </a>
                
            </div>
            {/* <div className="item-content w-[calc(100%-88px)] pl-[20px]">
                <h3 className="leading-[21px]">
                    <Link href={slug}>
                        <a className="text-[15px] transition-all hover:text-primary">
                            {country}
                        </a>
                    </Link>
                </h3>
                </div> */}
            <div className="item-content w-[calc(100%-88px)] pl-[20px]">
                <h3 className="leading-[21px]">
                    {/* <Link href={slug}>
                        <a className="text-[15px] transition-all hover:text-primary">
                            {title}
                        </a>
                    </Link> */}
                </h3>
                <div className="font-medium text-[15px] leading-[26px]">
                    Qty : <span className="text-[#666666]">{quantity}</span>
                </div>
                <div className="font-medium text-[13px] leading-[23px]">
                    Price:{' '}
                    <span className="text-[#666666]">{price}</span>{' '}
                </div>
            </div>
            <button type="button" className="item-remove flex items-start">
                <IoCloseOutline
                    onClick={() => removeItemFromCartHandler(item.id)}
                />
            </button>
        </li>
    );
}

CartItem.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired,
};

export default CartItem;
