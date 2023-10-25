import { useRouter } from "next/router";
import PropTypes from 'prop-types';
// import { getAllItems, getItemData, getItemsFiles } from '../../lib/ProductUtil';
import HeaderOne from '../../components/HeaderComps';
import Breadcrumb from '../../components/Breadcrumb/index-2';
import ProductDetails from '../../components/Products/ProductDetails';
import FooterComps from '../../components/FooterComps';


function ProductDetailPage({
    product,
    headerItems,
    productDetailTabItems,
    footerItems,
}) {
    const router = useRouter();
    const products ={
                id : router.query.id ,
                title : router.query.title,
                price : router.query.price ,
                image : router.query.image,
                category : router.query.category ,
                desc : router.query.desc,
                off_percentage:router.off_percentage,
                isRecommended:router.isRecommended,
            }
    
            console.log('dfeferfrefefre',JSON.stringify(products));

    return (
        <>
            {/* <HeaderOne headerItems={headerItems} headerContainer="container" /> */}
            <Breadcrumb
                breadcrumbContainer="container"
                product={products}
                item="Home"
                itemPath="/"
            />
            <ProductDetails
                product1={products}
                productDetailTabItems={productDetailTabItems}
                productFilterPath="carousel"
            />
            {/* <FooterComps
                footerContainer="container"
                footerItems={footerItems}
            /> */}
        </>
    );
}


// export function getStaticProps() {
    


//     const headerItems = getAllItems('header');
//     // const product = getItemData(slug, 'products');
//     // const productDetailTabItems = getAllItems('product-detail-tab');
//     const footerItems = getAllItems('footer');
//     console.log("footer  "+footerItems);

//     return {
//         props: {
//             headerItems,
//             products,
//             // productDetailTabItems,
//             footerItems,
//         },
//     };
// }

// export function getStaticPaths() {
//     const productFilenames = getItemsFiles('products');

//     const slugs = productFilenames.map((fileName) =>
//         fileName.replace(/\.md$/, '')
//     );

//     return {
//         // paths: slugs.map((slug) => ({ params: { slug } })),
//         fallback: false,
//     };
// }

ProductDetailPage.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    product: PropTypes.instanceOf(Object).isRequired,
    productDetailTabItems: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default ProductDetailPage;
