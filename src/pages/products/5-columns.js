import { useEffect } from 'react';
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import HeaderOne from '../../components/HeaderComps';
import Breadcrumb from '../../components/Breadcrumb';
import ProductFiveColumns from '../../components/Products/ProductFiveColumns';
import FooterComps from '../../components/FooterComps';
import { getAllItems } from '../../lib/ProductUtil';


function ProductFiveColumnsPage({ 
    headerItems,
    products,
    productFilter,
    gridTabItems,
    footerItems,
})

{

    const router = useRouter();
    const data = router.query || 'default value';




    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="Product"
                item="Home"
                itemPath="/"
                activeItem="Products"
            />
            <ProductFiveColumns
                productFiveColumnsContainer="container-fluid xl:px-[60px] px-[5px]"
                products={products}
                productcategoryid={data}
                productFilter={productFilter}
                productFilterPath="5-columns"
                gridTabItems={gridTabItems}

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
    const gridTabItems = getAllItems('grid-tab-2');
    const footerItems = getAllItems('footer');
    

    return {
        props: {
            headerItems,
            products,
            productFilter,
            gridTabItems,
            footerItems,
        },
    };
}

ProductFiveColumnsPage.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    products: PropTypes.instanceOf(Object).isRequired,
    productFilter: PropTypes.instanceOf(Object).isRequired,
    gridTabItems: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,

};

export default ProductFiveColumnsPage;
