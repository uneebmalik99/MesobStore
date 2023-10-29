import Link from 'next/link';

import PropTypes from 'prop-types';
import _ from 'lodash';
import { API, graphqlOperation } from 'aws-amplify';

import { getAllItems, getFeaturedItems } from '../lib/ItemsUtil';
import TransparentHeader from '../components/HeaderComps/TransparentHeader';
import HeroOne from '../components/Hero';
import FeaturedProduct from '../components/HomePage/FeaturedProduct';
import BestSellingProduct from '../components/HomePage/BestSellingProduct';
import OfferColection from '../components/OfferColection';
import LatestBlog from '../components/HomePage/LatestBlog';
import NewsletterComps from '../components/NewsletterComps';
import FooterComps from '../components/FooterComps';
import { useEffect, useState , useRef} from 'react';
import * as queries from '../graphql/queries';
import HeaderOne from '../components/HeaderComps';


import { useDispatch } from 'react-redux';

import { cartActions } from '../../src/store/cart/cart-slice';

const getMenuItems = `
query MyQuery {
    listMenus {
      items {
        icon
        id
        name
        des
      }
    }
  }
  `;
  
function HomePage({
    headerItems,
    heroDefaultItems,
    featuredProduct,
    productFilter,
    offerColection,
    blogs,
    footerItems,
    
}) {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [MenuList,setMenuList]= useState([]);
    const [RecommendedProduct,setRecommendedProduct]=useState([])
   
    const [R_categories,setR_categories]=useState([])
    const uniqueCategories = new Set();
    let allCategories;

    console.log('Products in state are: ', products);

    const targetDivRef = useRef(null);

    const scrollToTargetDiv = () => {
        setTimeout(() => {
          if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Adjust the delay as needed
      };
      
    const fetchProducts = async () => {

       
        try {
            const response = await API.graphql(
                graphqlOperation(queries.listProducts)
            );
            const allProducts = response.data.listProducts.items;
            const allProducts2 = response.data.listProducts.items;
            console.log("djsvjdnsvj"+JSON.stringify(allProducts2));
            let receomedproducts= [];
            for(let i = 0; i< response.data.listProducts.items.length; i++){
                console.log('fjdnjk'+JSON.stringify(response.data.listProducts.items[i].isRecommended));
                if(response.data.listProducts.items[i].isRecommended == true){
                    receomedproducts.push(response.data.listProducts.items[i])
                }
            }
            const searchItems = response.data.listProducts.items.map((item) => ({
                id: item.id,
                title: item.title,
              }));

              console.log('    bgvghvgh   '+JSON.stringify(searchItems));
              
              // Dispatch the action to store the search items in Redux
              dispatch(cartActions.seacrhItem(searchItems));
              
            const receomedproducts2 = receomedproducts.slice(1, -1);

            console.log('Rrcommend Products ', JSON.stringify(receomedproducts2));
            console.log('Response Products:1 ', allProducts[7].isRecommended);

            setRecommendedProduct(
                allProducts2.filter(item => {
                  const isRecommended = item?.isRecommended || null;
                  if (isRecommended) {
                    R_categories.push(item.category)
                    return item;
                  }
                }),
              );
            setProducts(
                allProducts.map((item) => {
                    console.log('gkenrgkjer'+item.isRecommended)
                    return _.pick(JSON.parse(item.content), [
                        'id',
                        'title',
                        'image',
                        'price',
                        'oldPrice',
                        'country',
                        'isRecommended',

                        
                    ]);
                })
            );

            const uniqueCategories = [...new Set(R_categories)];

            // Now, update the state with the unique values
            setR_categories(uniqueCategories);


            console.log('hggjg'+JSON.stringify(R_categories))



        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    
    const getMenuList = async () => {
        try {
          const res = await API.graphql(
            graphqlOperation(getMenuItems)
          ) ;
          console.log("menu  i s "+JSON.stringify(res.data.listMenus.items));


          const c1 = res.data.listMenus.items;

           setMenuList(c1);
         console.log("MenuList"+MenuList)
        } catch (error) {
          console.log("error at menu "+error?.message);
        }
      };
    useEffect(() => {
        console.log('UseEffect for fetching products');
       

         
        fetchProducts();
        getMenuList();
    }, []);

    
    let data ='msklmvlks';
    return (
        <>
            {/* <TransparentHeader headerItems={headesrItems} /> */}
            <HeaderOne headerItems={headerItems} headerContainer="container" />


            <HeroOne  func={scrollToTargetDiv} heroDefaultItems={heroDefaultItems} />


            {/* <FeaturedProduct featuredProduct={featuredProduct} /> */}
          
            <div className="categories-list-container" >
                
                <h2 className="categories-list-title" style={{marginTop:'3%'}}>
                Shop Categories 
                </h2>
                <div  className="categories-list  col-xs-4 col-sm-6 col-md-4 col-lg-3">
                                        {MenuList.map((Menu, index) => (
                       <Link 
                       href={`/products/5-columns?id=${Menu.id}&name=${Menu.name}`} 
                          >
                        <div  className="categories-item" key={index}>
                            <img
                                className="categories-image"
                                src={Menu.icon}
                            />
                    <h3   className="categories-title">{Menu.name}</h3>

                        </div>
                        </Link>
                    ))}
                </div>
            </div>



            
            <div ref={targetDivRef} style={{ paddingInline:'2%', paddingTop:'2%', paddingBottom:'2%'}}>

               

            <h2
                   className="offer-colection-title relative pb-[10px] mb-[20px] after:absolute after:left-0 after:bottom-0 after:bg-primary after:h-[4px] after:w-[70px]"
                    dangerouslySetInnerHTML={{
                    __html: offerColection[0].title,
                    }}
                    style={{marginLeft:'5%'}}
                    />

                <div className="product-list-container"  
                // style={{
                //     display: 'flex',
                //     overflowX: 'auto',
                //     whiteSpace: 'nowrap',
                //     padding: '10px',
                  
                //   }}
                >


                    
       


                               
                                {/* <div className="product-list">
                                    {RecommendedProduct.map((Rproduct, index) => { */}
                                   <div >

                                    {R_categories.map((cproduct, index) => {
                                                            
                                                            console.log("mnbjhbn"+cproduct);

                                                            return(
                                                                <>
                                                            <div>


                                                            <h5 style={{alignSelf:'flex-start'}}>{cproduct}</h5>
                                                         <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6   grid-cols-1 gap-y-[5px]">
                                                            {/* <div className="col-12 col-xs-4 col-sm-6 col-md-4 col-slg-3  lm:gap-x-[25px]  gap-y-[5px] "> */}


                                        {/* if (Rproduct.isRecommended === true) {
                                            // Parse the JSON content to access the image property
                                            const contentObj = JSON.parse(Rproduct.content); */}

                                        {RecommendedProduct.map((Rproduct, index) => {

                                     
                                        console.log("Rproduct  nkjb"+JSON.stringify(Rproduct.content.price));
                                            
                                            
                                        let img = '';
                                        var price ;
                                        let old_price = '';

                                        if (Rproduct.isRecommended === true) {
                                            // Parse the JSON content to access the image property
                                            const contentObj = JSON.parse(Rproduct.content);
                                            // Set img to the image URL from the parsed content
                                            img = contentObj.image;
                                          
                                        }


                                        if (Rproduct.isRecommended == true && Rproduct.category == cproduct) {

                                           
                                            const contentObj = JSON.parse(Rproduct.content);
                                            // Set img to the image URL from the parsed content
                                            price = contentObj.price;
                                            old_price = price;
                                            price = price.slice(1)
                                            price = price.replace(/,/g, '');


                                            const off  = Rproduct.off_percentage.slice(0, -1);

                                            console.log("vfklns",price);
                                             
                                            console.log("fndudskkd", off)

                                                // Calculate the discounted price
                                                let discount = (off / 100) * price;
                                                let priceAfterDiscount = price - discount;

                                                console.log("cdsnsdfkdn",priceAfterDiscount); 

                                            let tenPercentOfPrice =priceAfterDiscount;
                                            
                                            tenPercentOfPrice = tenPercentOfPrice.toFixed(2)

                                        return (


                                            
                <Link
                            href={{
                            pathname: "/products/slug",
                            query:  {
                                id: Rproduct.id,
                                title: Rproduct.title,
                                image: img,
                                desc:Rproduct.desc,
                                price:price,
                                category:Rproduct.category,
                              }  }}  >

                                

                                            {/* <Link href={`/products/${Rproduct?.slug}`}> */}

                                        <div  className="product-item"  key={index}>

                                        <div style={{position:'absolute',height:30, width:30,display:'flex', justifyContent:'center',alignContent:'center'
                                        ,alignItems:'center', backgroundColor:'green',marginTop:-25,marginLeft:-10, borderRadius:'50%'}}>
                                                <p style={{color:'white',fontWeight:700, fontSize:10}}>{Rproduct.off_percentage}</p>
                                            </div>

                                            {/* <h2 className="product-title">{Rproduct.title}</h2> */}
                                            <h2 className="product-title">
                                            {Rproduct.title.length > 15
                                                ? `${Rproduct.title.substring(0, 15)}...`
                                                : Rproduct.title
                                            }
                                            </h2>
                                            {/* <h3 className="product-title">  {Rproduct.isRecommended}</h3> */}

                                        
                                            <img
                                                className="product-image"
                                                style={{borderRadius:10,height:180,  objectFit:'cover'}}

                                                src={img}
                                              
                                                alt={Rproduct.title}
                                            />
                                            <p className="product-price" style={{fontSize:12, textDecorationLine:'line-through',  textDecorationColor: "black" }} >

                                                Was: {old_price}
                                            </p>
                                            <p className="product-price" style={{color:'green', fontWeight:700}}>
                                                New Price: {tenPercentOfPrice}
                                            </p>
                                            <p className="product-country">
                                                Country: {Rproduct.country}
                                            </p>
                                        </div>
                                        </Link>

                                        )
                                        
                                        } else {
                                        // Render nothing for non-recommended products
                                        return null;


                                        
                                        }
                                     })}
                                   
                                        </div>
                                        </div>
                                        </>);
                                    


                                })}
                                </div>
                                  
                              </div>

                              </div>

                              

           
            {/* <LatestBlog blogs={blogs} sectionTitle="Mesob Store Blog" /> */}
            <NewsletterComps sectionTitle="Mesob Store subscription includes Subscribers receive discounts across the company's online retail platforms and shoppers receive their orders within two days"  />
            <FooterComps
                footerContainer="container"
                footerItems={footerItems}
            />
        </>
    );
}

export function getStaticProps() {
    const headerItems = getAllItems('header');
    const heroDefaultItems = getAllItems('hero-default');
    const featuredProduct = getAllItems('featured-product');
    const products = getAllItems('products');
    const productFilter = getAllItems('product-filter');
    const BestSellingProduct = getFeaturedItems(products);
    const offerColection = getAllItems('offer-colection');
    const blogs = getAllItems('blogs');
    const LatestBlog = getFeaturedItems(blogs);
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            heroDefaultItems,
            featuredProduct,
            products: BestSellingProduct,
            productFilter,
            offerColection,
            blogs: LatestBlog,
            footerItems,
        },
    };
}

HomePage.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    heroDefaultItems: PropTypes.instanceOf(Object).isRequired,
    featuredProduct: PropTypes.instanceOf(Object).isRequired,
    products: PropTypes.instanceOf(Object).isRequired,
    productFilter: PropTypes.instanceOf(Object).isRequired,
    offerColection: PropTypes.instanceOf(Object).isRequired,
    blogs: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,

};

export default HomePage;
