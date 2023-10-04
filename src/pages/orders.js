import React, {useState,useEffect} from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import Link from 'next/link';
import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import CartPageComps from '../components/CartPageComps';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ItemsUtil';
import {BsFillArrowUpCircleFill, BsFillArrowDownCircleFill} from "react-icons/bs"


function orders({ headerItems, products, cartPageItems, footerItems }) {
    const [openText3, setOpenText3] = useState(Array(orders.length).fill(false));

    const toggleText3 = (index) => {
      const updatedOpenText3 = [...openText3];
      updatedOpenText3[index] = !updatedOpenText3[index];
      setOpenText3(updatedOpenText3);
    };
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
        console.log("w2332323 "+resData);
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
    alert('')
      
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

{/* {order.map((order, index) => (
        <div key={index}>
          <div>Text</div>
          <button onClick={() => toggleText3(index)}>
            {openText3[index] ? 'Hide Text3/2' : 'Read more'}
          </button>
          
          
          {openText3[index] && (
            <div>
              Text3/2
            </div>
          )}

        </div>
      ))} */}


{order.map((order, index) => {
    let total1 = 0;
    let products = JSON.parse(order.Products);
    let p = [];

    p = JSON.parse(order.Products);
    console.log('dskdsv   '   +JSON.stringify(p[0]));
    
    console.log("nvjdnvds"+JSON.stringify(products));
    for(let i = 0; i< products.length ; i++){
        let price = products[i].price?.replace(/[\s,]/g, "")?.slice(1);
      price = Number(price) * products[i].qty;
      total1 = total1 + price;
    }
    console.log("kfsldn  -"+total1.toFixed(2));
    console.log('jbjb'+JSON.stringify(products))
    return(
        <>
        <div style={{ paddingInline:'5%',paddingBottom:'2%', paddingTop:'2%', borderBottomWidth:0.5, borderColor:'grey'}}>

     
           <li className="item flex items-start justify-between  pb-[5px] mb-[5px] last:mb-0 last:pb-0 last:border-b-0">
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

            <div  className="item-content w-[calc(20%-88px)] pl-[20px]">
                <h3 className="leading-[21px]">
                    <Link href=''>
                        <a className="text-[15px] transition-all hover:text-primary">
                            {order.name}
                        </a>
                    </Link>
                </h3>
            
                
               
             
            </div>
            <div className="font-medium text-[15px] leading-[26px]">
                    status : <span className="text-[#666666]">{order.Status}</span>
                </div>

            <div className="font-medium text-[15px] leading-[26px]">
                
                    Date : <span className="text-[#666666]">
                    {new Date(order.createdAt).toISOString().split('T')[0]}

                        </span>
                </div>
                <div className="font-medium text-[13px] leading-[23px]">
                    Total :{'$ '}  <span className="text-[#666666]">{total1}</span>{' '}
                </div>
            <div >
         

         
            </div>
           
        </li>
       
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <button onClick={() => toggleText3(index)}>
            {openText3[index] ? <BsFillArrowUpCircleFill/> :  <BsFillArrowDownCircleFill />}
          </button>
        </div>
        </div>
   
            {openText3[index] && (
                <div style={{display:'flex',justifyContent:'center',alignContent:'center', alignItems:'center', }}>


              
                        <div style={{backgroundColor:'#D0D3D4' ,width:'75%', alignSelf:'center', borderBottomRightRadius:10, borderBottomLeftRadius:10, }}>          
                        {p.map((product, index) => (
                            <div  style={{display:'flex',justifyContent:'space-evenly',borderBottomWidth:0.5,paddingTop:'2%', paddingBottom:'2%', paddingInline:'10%',flexDirection:'row',}}>
                            <img src={product.image} style={{resize:'contain'}}  width={30} height={30}/>

                            <h7 style={{paddingInline:5}}>{product.title}</h7>

                            <p  style={{paddingInline:5}}>
                            {product?.description?.length > 30
                                ? product.description.substring(0, 30) + '...'
                                : product.description}
                            </p>                            <p>Qty: {product.qty} </p>
                            <p  style={{paddingInline:5}}>{product.price} </p>
                            <p  style={{paddingInline:5}}>Category: {product.category}</p>
                            <button  style={{paddingInline:5}}>View </button>


                            </div>       
                        )
                        )  }
                           
                        </div>
                        </div>
                    )}               
          
</>
)

                })}
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
