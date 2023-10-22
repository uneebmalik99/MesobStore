import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';

function randr({ faqItems, title, desc }) {
   
    return (
        <div className="faq text-center border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
            <div className="container max-w-4xl">

            <h1>Refunds policy</h1>

<p>


You are entitled to cancel your order before its shipped.
The deadline for canceling an order is 24hrs from the date you received the order receipt.
In order to exercise your right of cancellation, you must inform us of your decision by means of a clear statement.
You can inform us of your decision by e-mail mesob@mesobstore.com
We will reimburse you no later than 7 since banks have different way of processing. We will use the same means of payment as you used for the order, and you will not incur any fees for such reimbursement.
Contact Us
If you have any questions about our Returns and Refunds Policy, please contact us by e-mail mesob@mesobstore.com</p>


                <h2 className="mb-[10px]">{title}</h2>
                <p className="mb-[45px]">{desc}</p>
                <div className="accorddion p-[15px] -m-[15px]">

        </div>
            </div>
        </div>
    );
}

randr.propTypes = {
    faqItems: PropTypes.instanceOf(Object).isRequired,
    
};

export default randr;
