import React, {useState,useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import Link from 'next/link';
import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import CartPageComps from '../components/CartPageComps';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ItemsUtil';


function orders({ headerItems, products, cartPageItems, footerItems }) {

    const [order,setOrderData] = useState([])
    const getMyOrders = async () => {
        const user = await Auth.currentAuthenticatedUser();
  if(user?.attributes?.sub){
      const userSUb = user?.attributes?.sub;
  
      console.log(userSUb);
      try {
        const res = (await API.graphql(
          graphqlOperation(
            `query MyQuery {
            listOrders(limit: 1000, filter: {userID: {eq: "${userSUb}"}}) {
              items {
                userID
                name
                Products
                Status
                address
                city
                createdAt
                id
                isSender
                phone
                senderAddress
                updatedAt
                usersOrdersId
              }
            }
          }          
          `,
            {},
          ),
        )) ;
        console.log(JSON.stringify(res?.data?.listOrders?.items), 'res');
        const resData = res?.data?.listOrders?.items;
        setOrderData(resData);
        console.log(
          'sort',
          resData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }),
        );
      } catch (error) {
        console.log(error);
      } 
  }else{
    alert('vjk')
      
  }
     
      };
    useEffect(() => {
    
    
        getMyOrders();
      }, []);

    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
            <Breadcrumb
                breadcrumbContainer="container"
                title="My Orders"
                item="Home"
                itemPath="/"
                activeItem="My Orders"
            />


{order.map((order, index) => {
    let total1 = 0;
    const products = JSON.parse(order.Products);
    console.log("nvjdnvds"+JSON.stringify(products));
    for(let i = 0; i< products.length ; i++){
        let price = products[i].price?.replace(/[\s,]/g, "")?.slice(1);
      price = Number(price) * products[i].qty;
      total1 = total1 + price;
    }
    console.log("kfsldn  -"+total1.toFixed(2));
    return(
        <>
        <div style={{ paddingInline:'5%',paddingBottom:'3%', paddingTop:'3%', borderBottomWidth:0.5, borderColor:'grey'}}>

     
           <li className="item flex items-start justify-between border-b border-[#dddddd] pb-[25px] mb-[20px] last:mb-0 last:pb-0 last:border-b-0">
            <div className="item-img">
               
                    {/* <a className="product-img">
                        <img src={} alt={} />
                    </a> */}
                
            </div>
            {/* <div className="item-content w-[calc(100%-88px)] pl-[20px]">
                <h3 className="leading-[21px]">
                    <Link href={slug}>
                        <a className="text-[15px] transition-all hover:text-primary">
                            {country}
                        </a>
                    </Link>
                </h3>
                </div> */}

<div className="font-medium text-[15px] leading-[26px]">
                    id : <span className="text-[#666666]">{order.id}</span>
                </div>

            <div className="item-content w-[calc(100%-88px)] pl-[20px]">
                <h3 className="leading-[21px]">
                    <Link href=''>
                        <a className="text-[15px] transition-all hover:text-primary">
                            {order.name}
                        </a>
                    </Link>
                </h3>
            
                
                <div className="font-medium text-[15px] leading-[26px]">
                    status : <span className="text-[#666666]">{order.Status}</span>
                </div>
                <div className="font-medium text-[15px] leading-[26px]">
                    Date : <span className="text-[#666666]">{order.createdAt}</span>
                </div>
                <div className="font-medium text-[13px] leading-[23px]">
                    Total :{'$ '}  <span className="text-[#666666]">{total1}</span>{' '}
                </div>
            </div>

            <div >
            <button>v</button>

         
            </div>
           
            
        </li>

        </div>
          
            <div style={{backgroundColor:'red'}}>dfmfdfd</div>
          
</>
)

                })};
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

orders.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default orders;
