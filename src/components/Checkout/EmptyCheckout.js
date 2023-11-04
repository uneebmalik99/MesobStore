import Link from 'next/link';
import { IoArrowBackSharp, IoCartOutline } from 'react-icons/io5';

function EmptyCheckout() {
    return (
        <div className="empty-checkout flex flex-col items-center">
            <span className="icon text-[170px]">
                <IoCartOutline />
            </span>
            {/* <p className="text-[20px]">No items found in cart to checkout</p> */}
            <p className="text-[20px]">Thank you for Purchasing from MesobStore</p>
            <div className="btn-wrap pt-[25px]">
                <Link href="/">
                    <a className="inline-flex items-center bg-black text-white h-[46px] px-[42px] transition-all hover:bg-[#222222]">
                        <IoArrowBackSharp className="mr-[5px]" />
                        Continue Shopping
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default EmptyCheckout;
