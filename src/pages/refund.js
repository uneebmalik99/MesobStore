import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ItemsUtil';

function refund({ headerItems, faqItems, footerItems }) {
    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="Refunds policy"
                item="Home"
                itemPath="/"
                activeItem="Refunds policy"
            />

<div className="faq border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
<div className="container max-w-4xl">

<h1>Refunds policy</h1>

<p>


You are entitled to cancel your order before its shipped.
The deadline for canceling an order is 24hrs from the date you received the order receipt.
In order to exercise your right of cancellation, you must inform us of your decision by means of a clear statement.
You can inform us of your decision by e-mail mesob@mesobstore.com
We will reimburse you no later than 7 days since banks have different way of processing. We will use the same means of payment as you used for the order, and you will not incur any fees for such reimbursement.
Contact Us
If you have any questions about our Returns and Refunds Policy, please contact us by e-mail mesob@mesobstore.com</p>


    {/* <h2 className="mb-[10px]">{title}</h2>
    <p className="mb-[45px]">{desc}</p> */}
    <div className="accorddion p-[15px] -m-[15px]">

</div>
</div>
        </div>
          
            <FooterComps
                footerContainer="container"
                footerItems={footerItems}
            />
        </>
    );
}

export function getStaticProps() {
    const headerItems = getAllItems('header');
    const faqItems = getAllItems('faq');
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            faqItems,
            footerItems,
        },
    };
}

refund.propTypes = {
    headerItems: PropTypes.instanceOf(Array).isRequired,
    faqItems: PropTypes.instanceOf(Array).isRequired,
    footerItems: PropTypes.instanceOf(Array).isRequired,
};

export default refund;
