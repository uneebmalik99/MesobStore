import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import ProductToolBars from './ProductToolBars';
import ProductActiveFilter from './ProductActiveFilter';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';

function ProductFiveColumns({
    data,
    productFiveColumnsContainer,
    products,
    productFilter,
    productcategoryid,
    productFilterPath,
    gridTabItems,

}) {
    const { filterData } = useSelector((state) => state.filter);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setitemPerPage] = useState(9);

    const [pageNumberLimit, setPageNumberLimit] = useState(9);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(9);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [product, setproduct] = useState([])
    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const filteredProduct = products.filter((singleProduct) => {
        const filterGroupResult = {};

        filterData.forEach((singleFilterData) => {
            if (singleFilterData.key === 'priceFilter') {
                filterGroupResult[singleFilterData.group] =
                    singleFilterData.data.fromPrice <= singleProduct.price &&
                    singleProduct.price <= singleFilterData.data.toPrice;
            } else if (!filterGroupResult[singleFilterData.group]) {
                filterGroupResult[singleFilterData.group] =
                    singleProduct[singleFilterData.group] ===
                    singleFilterData.key;
            }
        });

        return !Object.values(filterGroupResult).includes(false);
    });

    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredProduct.length / itemPerPage); i++) {
        pages.push(i);
    }

    const indexofLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexofLastItem - itemPerPage;
    const currentItems = filteredProduct.slice(
        indexOfFirstItem,
        indexofLastItem
    );

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li className="px-[5px]" key={number}>
                    <span
                        className={`${
                            currentPage === number ? 'active' : ''
                        } bg-[#f5f5f5] cursor-pointer flex items-center px-[13px] h-[34px] text-[12px] font-medium`}
                        id={number}
                        onClick={handleClick}
                    >
                        {number}
                    </span>
                </li>
            );
        }
        return null;
    });
   

    const getProductByMenuId = async () => {
        console.log('jvjfvdfvdkjjbjbj   '+JSON.stringify(productcategoryid.id))

        try {
          const res = await API.graphql(
            graphqlOperation(
              `
          query MyQuery {
            listProducts(limit: 10000,filter: {categories: {contains: "${productcategoryid.id}"}}) {
              items {
                title
                category
                content
                country
                createdAt
                id
                updatedAt
                isRecommended
                off_percentage
              }
            }
          }
          
          `,
              {},
            ),
          );

          console.log("dsnfsjkdnfjn"+ JSON.stringify(res.data));
          setproduct(
            res.data.listProducts.items?.map(item => {
              let temp = {
                ...item,
                content: JSON.parse(item.content),
                ...JSON.parse(item.content),
              };
              return temp;
            }),
          );

          console.log('7777777ffyufyufyufy'+JSON.stringify(product))
        } catch (error) {
          console.log(error);
        } finally {
        }
      };

      console.log("jifinfrnriwnevw"+JSON.stringify(productcategoryid));

      useEffect(() => {
        console.log("yvhtftyfdtyfytf");
        getProductByMenuId()
    }, []);

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };
    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % maxPageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}>&hellip;</li>;
    }

    // Tab
    const [tabState, setTabState] = useState(3);
    const productTab = (index) => {
        setTabState(index);
    };

    return (<div className="product border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
    <div className={productFiveColumnsContainer}>
        <div className="grid grid-cols-12 lg:gap-x-[25px]">
            <div className="col-span-12">


                
                <div
                    className={
                        tabState === 1
                            ? 'grid-content-03 tab-style-common active'
                            : 'grid-content-03 tab-style-common'
                    }
                >
                    {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 lm:grid-cols-2 grid-cols-2 lm:gap-x-[25px] gap-y-[40px] "> */}
                    <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6   grid-cols-2 gap-y-[5px]">
                        {currentItems &&
                            currentItems.map((product) => (
                                <ProductItem
                                    product={product}
                                    productFilter={productFilter}
                                    productFilterPath={
                                        productFilterPath
                                    }
                                    key={product.id}
                                />
                            ))}
                    </div>
                </div>
                <div
                    className={
                        tabState === 2
                            ? 'grid-content-04 tab-style-common active'
                            : 'grid-content-04 tab-style-common'
                    }
                >
                    {/* <div className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 "> */}
                    <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6   grid-cols-2 gap-y-[5px]">
                        {currentItems &&
                            currentItems.map((product) => (
                                <ProductItem
                                    product={product}
                                    productFilter={productFilter}
                                    productFilterPath={
                                        productFilterPath
                                    }
                                    key={product.id}
                                />
                            ))}
                    </div>
                </div>

                {/* <div
                    className={
                        tabState === 3
                            ? 'grid-content-05 tab-style-common active'
                            : 'grid-content-05 tab-style-common'
                    }
                >
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 lm:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-[25px] gap-y-[40px]">
                        {currentItems &&
                            currentItems.map((product) => (
                                <ProductItem
                                    product={product}
                                    productFilter={productFilter}
                                    productFilterPath={
                                        productFilterPath
                                    }
                                    key={product.id}
                                />
                            ))}
                    </div>
                </div> */}
                {/* <ul className="pagination flex justify-center pt-[40px]">
                    <li className="px-[5px]">
                        <button
                            className={`${
                                currentPage === pages[0] ? 'hidden' : ''
                            } bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]`}
                            type="button"
                            onClick={handlePrevbtn}
                            disabled={currentPage === pages[0]}
                        >
                            Prev
                        </button>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    <li className="px-[5px]">
                        <button
                            className={`${
                                currentPage === pages[pages.length - 1]
                                    ? 'hidden'
                                    : ''
                            } bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]`}
                            type="button"
                            onClick={handleNextbtn}
                            disabled={
                                currentPage === pages[pages.length - 1]
                            }
                        >
                            Next
                        </button>
                    </li>
                </ul> */}

<div className="product-list-container"  >
                <h1>{productcategoryid.name}</h1>
                <p style={{color:'grey', marginTop:5}}>{productcategoryid.id == '1' ? "We deliver to Europe, Australia, and North America.":productcategoryid.id == '5'?" This is groceris for Eritrea. Delivery will take upto three business days.":''}</p>
                <div className="product-list">
                    {product.map((product, index) => (
                            <ProductItem
                            product={product}
                            productFilter={productFilter}
                            productFilterPath={
                                productFilterPath
                            }
                            key={product.id}
                            />
                    ))}
                </div>
            </div>

                 {/* <div className="product-list-container"  >
                <h1>{productcategoryid.name}</h1>
                <p style={{color:'grey', marginTop:5}}>{productcategoryid.id == '1' ? "We deliver to Europe, Australia, and North America.":productcategoryid.id == '5'?" This is groceris for Eritrea. Delivery will take upto three business days.":''}</p>
                <div className="product-list">
                    {product.map((product, index) => (



                        <div className="product-item" key={index}>
                            <h3 className="product-title">{product.title}</h3>
                            <img
                                className="product-image"
                                src={product.image}
                                alt={product.title}
                            />
                            <p className="product-price">
                                 {product.price}
                            </p>
                            <p className="product-country">
                             {product.country}
                            </p>
                        </div>
                    ))}
                </div>
            </div> */}


            </div>
        </div>
    </div>
</div>

        // <div className="product border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
        //     <div className={productFiveColumnsContainer}>
        //         <div className="grid grid-cols-12 lg:gap-x-[25px]">
        //             <div className="col-span-12">
        //                 <ProductActiveFilter />
        //                 <ProductToolBars
        //                     totalProductNumber={filteredProduct.length}
        //                     startItemNumber={
        //                         (currentPage - 1) * itemPerPage + 1
        //                     }
        //                     endItemNumber={
        //                         filteredProduct.length >
        //                         currentPage * itemPerPage
        //                             ? currentPage * itemPerPage
        //                             : filteredProduct.length
        //                     }
        //                     productTab={productTab}
        //                     tabState={tabState}
        //                     setTabState={setTabState}
        //                     gridTabItems={gridTabItems}
        //                 />
        //                 <div
        //                     className={
        //                         tabState === 1
        //                             ? 'grid-content-03 tab-style-common active'
        //                             : 'grid-content-03 tab-style-common'
        //                     }
        //                 >
        //                     <div className="grid lg:grid-cols-3 lm:grid-cols-2 grid-cols-1 lm:gap-x-[25px] gap-y-[40px] ">
        //                         {currentItems &&
        //                             currentItems.map((product) => (
        //                                 <ProductItem
        //                                     product={product}
        //                                     productFilter={productFilter}
        //                                     productFilterPath={
        //                                         productFilterPath
        //                                     }
        //                                     key={product.id}
        //                                 />
        //                             ))}
        //                     </div>
        //                 </div>
        //                 <div
        //                     className={
        //                         tabState === 2
        //                             ? 'grid-content-04 tab-style-common active'
        //                             : 'grid-content-04 tab-style-common'
        //                     }
        //                 >
        //                     <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-[25px] gap-y-[40px]">
        //                         {currentItems &&
        //                             currentItems.map((product) => (
        //                                 <ProductItem
        //                                     product={product}
        //                                     productFilter={productFilter}
        //                                     productFilterPath={
        //                                         productFilterPath
        //                                     }
        //                                     key={product.id}
        //                                 />
        //                             ))}
        //                     </div>
        //                 </div>
        //                 <div
        //                     className={
        //                         tabState === 3
        //                             ? 'grid-content-05 tab-style-common active'
        //                             : 'grid-content-05 tab-style-common'
        //                     }
        //                 >
        //                     <div className="grid lg:grid-cols-5 md:grid-cols-4 lm:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-[25px] gap-y-[40px]">
        //                         {currentItems &&
        //                             currentItems.map((product) => (
        //                                 <ProductItem
        //                                     product={product}
        //                                     productFilter={productFilter}
        //                                     productFilterPath={
        //                                         productFilterPath
        //                                     }
        //                                     key={product.id}
        //                                 />
        //                             ))}
        //                     </div>
        //                 </div>
        //                 <ul className="pagination flex justify-center pt-[40px]">
        //                     <li className="px-[5px]">
        //                         <button
        //                             className={`${
        //                                 currentPage === pages[0] ? 'hidden' : ''
        //                             } bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]`}
        //                             type="button"
        //                             onClick={handlePrevbtn}
        //                             disabled={currentPage === pages[0]}
        //                         >
        //                             Prev
        //                         </button>
        //                     </li>
        //                     {pageDecrementBtn}
        //                     {renderPageNumbers}
        //                     {pageIncrementBtn}
        //                     <li className="px-[5px]">
        //                         <button
        //                             className={`${
        //                                 currentPage === pages[pages.length - 1]
        //                                     ? 'hidden'
        //                                     : ''
        //                             } bg-[#f5f5f5] cursor-pointer flex items-center text-[14px] px-[13px] h-[34px]`}
        //                             type="button"
        //                             onClick={handleNextbtn}
        //                             disabled={
        //                                 currentPage === pages[pages.length - 1]
        //                             }
        //                         >
        //                             Next
        //                         </button>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

ProductFiveColumns.propTypes = {
    productFiveColumnsContainer: PropTypes.string,
    products: PropTypes.instanceOf(Object).isRequired,
    productFilter: PropTypes.instanceOf(Object).isRequired,
    productFilterPath: PropTypes.string.isRequired,
    gridTabItems: PropTypes.instanceOf(Object).isRequired,
};

export default ProductFiveColumns;
