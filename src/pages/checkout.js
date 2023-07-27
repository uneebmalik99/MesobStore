import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import Checkout from '../components/Checkout';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ItemsUtil';

function CheckoutPage({ headerItems, checkoutItems, footerItems }) {
    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="Checkout"
                item="Home"
                itemPath="/"
                activeItem="Checkout"
            />
            <Checkout checkoutItems={checkoutItems} />
            <FooterComps
                footerContainer="container"
                footerItems={footerItems}
            />
        </>
    );
}

export function getStaticProps() {
    const headerItems = getAllItems('header');
    const checkoutItems = getAllItems('checkout');
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            checkoutItems,
            footerItems,
        },
    };
}

CheckoutPage.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    checkoutItems: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default CheckoutPage;
