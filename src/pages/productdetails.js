import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import AboutUs from '../components/AboutUs';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ItemsUtil';
import { useRouter } from "next/router";
import ProductDetails from '../components/Products/ProductDetails';

function product({ headerItems, aboutItems,productDetailTabItems, footerItems }) {
    const router = useRouter();
    const products ={
                id : router.query.id ,
                title : router.query.title,
                price : router.query.price ,
                newprice : router.query.newprice,
                selleremail: router.query.selleremail,
                cost : router.query.cost,
                image : router.query.image,
                category : router.query.category ,
                desc : router.query.desc,
                off_percentage : router.query.off_percentage,
                isRecommended : router.query.isRecommended
            }


            console.log("fsdfdfs",products.selleremail);
    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="About Mesob Store"
                item="Home"
                itemPath="/"
                activeItem="About Us"
            />
           <ProductDetails
                product1={products}
                productDetailTabItems={productDetailTabItems}
                productFilterPath="carousel"
            />
            <FooterComps
                footerContainer="container"
                footerItems={footerItems}
            />
        </>
    );
}

export function getStaticProps() {
    const headerItems = getAllItems('header');
    const aboutItems = getAllItems('about');
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            aboutItems,
            footerItems,
        },
    };
}

product.propTypes = {
    headerItems: PropTypes.instanceOf(Array).isRequired,
    aboutItems: PropTypes.instanceOf(Array).isRequired,
    footerItems: PropTypes.instanceOf(Array).isRequired,
};

export default product;
