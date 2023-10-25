import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import ProductFiveColumns from '../components/Products/ProductFiveColumns';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ProductUtil';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';


function search({ 
    headerItems,
   
    footerItems,
})


{
    const [products, setproducts] = useState([])
    const router = useRouter();
    const [product,setproduct] = useState([])
    const [nf, setnf] = useState(true)
    const data = router.query || 'default value';

    function getQueryParameters() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const data = {};
      
        for (const [key, value] of params.entries()) {
          data[key] = value;
        }
      
        return data;
      }

      
      const searchproduct = async(searchString) => {
        console.log("nbvhbh", searchString);
             try {
                    const response = await API.graphql(
                      graphqlOperation(queries.listProducts, {
                        filter: {
                          title: {
                            contains: searchString ,
                          },
                        },
                        limit: 100, // Set your desired limit
                        nextToken: null, // Set the pagination token if needed
                      })
                    );
                    
                    const products = response.data.listProducts.items;
                    
        
                    if(products){

                      setnf(true)
                       console.log("kdjsnkdnk","Yes");
                       setproduct(products)
                    }
                    else{
                      setnf(false)

                        console.log("kdjsnkdnk","NO");

                    }
                    console.log('Products matching the search keyword:2222', products);
                  } catch (error) {
                    console.error('Error fetching products:', error);
                  }
        
        }

      useEffect(() => {
        const queryParameters = getQueryParameters();
        console.log("bbjfbjkvbsjkds ", queryParameters.search );
        searchproduct(queryParameters.search)

    
    }, []);

    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="Search Products"
                item="Home"
                itemPath="/"
                activeItem="Searched Products"
            />
           <div style={{ paddingBlock:"1%",paddingInline:'4%'}}>

           {product.length == 0?
            
              <p>Not Found</p>
            
              :
              null
            
            }

           {product.map((productsingle) => {

                const contentObj = JSON.parse(productsingle.content);
                let receomed = productsingle.isRecommended
                if(receomed == true){
                    let off = productsingle.off_percentage

                }else{

                }
                                return(
                                    <div style={{justifyContent:'space-evenly',borderBottomWidth:1,borderColor:'grey', marginBlock:'1%', display:'flex', flexDirection:'row' }}>
                                        <img width={50} height={50} src={contentObj.image}/>
                                        <p >{productsingle.title}</p>
                                        <p > Category : {productsingle.category}</p>
                                        <p > Price: {contentObj.price}</p>
                                       
                                    </div>
                                )

                            })
                        }
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

    const footerItems = getAllItems('footer');
    

    return {
        props: {
            headerItems,
            
            footerItems,
        },
    };
}

search.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
   
    footerItems: PropTypes.instanceOf(Object).isRequired,

};

export default search;
