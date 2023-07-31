import PropTypes from 'prop-types';
import HeaderOne from '../../components/HeaderComps';
import Breadcrumb from '../../components/Breadcrumb';
import ProductTabSlider from '../../components/ProductTab/tab-slider';
import ProductThreeColumns from '../../components/Products/ProductThreeColumns';
import FooterComps from '../../components/FooterComps';
import { getAllItems } from '../../lib/ProductUtil';

function ProductCarouselPage({
    headerItems,
    products,
    productTab,
    productFilter,
    gridTabItems,
    footerItems,
}) {
    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="Product"
                item="Home"
                itemPath="/"
                activeItem="Product Carousel"
            />
            <ProductTabSlider
                products={products}
                productTab={productTab}
                tabTitle="Trending items"
                containerCName="container"
                productFilter={productFilter}
                productFilterPath="carousel"
            />
            <ProductThreeColumns
                products={products}
                gridTabItems={gridTabItems}
                productFilter={productFilter}
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
    const products = getAllItems('products');
    const productFilter = getAllItems('product-filter');
    const productTab = getAllItems('product-tab');
    const gridTabItems = getAllItems('grid-tab-2');
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            products,
            productTab,
            productFilter,
            gridTabItems,
            footerItems,
        },
    };
}

ProductCarouselPage.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    products: PropTypes.instanceOf(Object).isRequired,
    productFilter: PropTypes.instanceOf(Object).isRequired,
    productTab: PropTypes.instanceOf(Object).isRequired,
    gridTabItems: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default ProductCarouselPage;
