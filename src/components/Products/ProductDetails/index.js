import PropTypes from 'prop-types';
import MainContent from './main-content';
import ProductDetailTab from './ProductDetailTab';

function ProductDetails({ product1, productDetailTabItems }) {

    console.log("vmkmvlmvs"+JSON.stringify(product1));
    return (
        <main>
            <MainContent product={product1} />
            {/* <ProductDetailTab
                product={product}
                productDetailTabItems={productDetailTabItems}
            /> */}
        </main>
    );
}

ProductDetails.propTypes = {
    product: PropTypes.instanceOf(Object).isRequired,
    productDetailTabItems: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetails;
