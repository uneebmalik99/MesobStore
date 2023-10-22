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
    const [orderVisibility, setOrderVisibility] = useState({}); // Initialize an empty object for order visibility

    const toggleOrderVisibility = (orderId) => {
        setOrderVisibility((prevOrderVisibility) => ({
          ...prevOrderVisibility,
          [orderId]: !prevOrderVisibility[orderId] || false,
        }));
      };
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

{order.map((order, index) => {
    let total1 = 0;
    // const products = JSON.parse(order.Products);

    let products = JSON.parse(order.Products);
    let p = [];

    p = JSON.parse(order.Products);
    console.log('dskdsv   '   +JSON.stringify(p[0]));
    console.log("nvjdnkjbvds"+JSON.stringify(products));

    console.log("nvjdnvds"+JSON.stringify(order));
    let priducttodisplay = []

    for(let i = 0; i< products.length ; i++){
        let price = products[i].price?.replace(/[\s,]/g, "")?.slice(1);
      price = Number(price) * products[i].qty;
      total1 = total1 + price;
    }
    console.log("kfsldn  -"+total1.toFixed(2));
    return(
        <>
        <div style={{borderBottomWidth:1,}}>

      
        <div  style={{ paddingInline:10,marginTop:'2%',paddingBlock:'2%', display:'flex', justifyContent:'space-evenly', }}>

        

     
        <p className="text-[#666666]"> id : {order.id}</p>
        {/* <span className="text-[#666666]"> status :{order.Status}</span> */}

       <p>Status : </p>

       <div style={{display:'flex', flexDirection:'column'}}>

      

        <div style={{  display:'flex', flexDirection:'row'}}>
        <div style={{
  position: 'relative',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: '#ffffff'
}}>
       <div style={{
  backgroundImage:order.Status == 'Orderd' ? 'linear-gradient(to bottom, rgb(9, 112, 26) 0%, rgb(21, 255, 0) 100%)':'linear-gradient(to bottom, rgb(255, 225, 225) 0%, rgb(225, 255, 225) 0%)',
  content: '',
  position: 'absolute',
  top: '-5px',
  bottom: '-5px',
  right: '-5px',
  left: '-5px',
  zIndex: '-1',
  borderRadius: 'inherit'
}}>
    </div> 
    </div> 
      
    <p style={{paddingInline:5,}}> Item Ordered </p> 

        </div>




        <div style={{  display:'flex', flexDirection:'row'}}>
        <div style={{
  position: 'relative',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: '#ffffff'
}}>
       <div style={{
  backgroundImage:order.Status == 'Shipped' ? 'linear-gradient(to bottom, rgb(9, 112, 26) 0%, rgb(21, 255, 0) 100%)':'linear-gradient(to bottom, rgb(255, 225, 225) 0%, rgb(225, 255, 225) 100%)',
  content: '',
  position: 'absolute',
  top: '-5px',
  bottom: '-5px',
  right: '-5px',
  left: '-5px',
  zIndex: '-1',
  borderRadius: 'inherit'
}}>
    </div> 
    </div> 
      
    <p style={{paddingInline:5,}}> Item Shipped </p> 

        </div>





        <div style={{  display:'flex', flexDirection:'row'}}>
        <div style={{
  position: 'relative',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: '#ffffff'
}}>
       <div style={{
  backgroundImage:order.Status == 'Delivered'? 'linear-gradient(to bottom, rgb(9, 112, 26) 0%, rgb(21, 255, 0) 100%)':'linear-gradient(to bottom, rgb(255, 225, 225) 0%, rgb(225, 255, 225) 100%)',
  content: '',
  position: 'absolute',
  top: '-5px',
  bottom: '-5px',
  right: '-5px',
  left: '-5px',
  zIndex: '-1',
  borderRadius: 'inherit'
}}>
    </div> 
    </div> 
      
    <p style={{paddingInline:5,}}> Item Successfully Delivered </p> 

        </div>

        </div>

        <span className="text-[#666666]">Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
        <span className="text-[#666666]">Total :{'$ '}{total1}</span>{' '}


       
        </div>



        <div>
             
        <div style={{ paddingInline: 10, paddingBlock: '2%', display: 'flex', justifyContent: 'space-evenly' }}>
                    <button style={{backgroundColor:'orange',paddingBlock:10,paddingInline:10, borderRadius:10, color:'white'}} onClick={() => toggleOrderVisibility(order.id)}>
                      {orderVisibility[order.id] ? 'Hide Products' : 'View Products'}
                    </button>
                  </div>
                  {orderVisibility[order.id] && (
                    <div>
                      {products.map((product, index) => {
                        return (
                          <div style={{ borderBottomWidth: 1, paddingInline: 30, marginTop: '1%', paddingBlock: '1%', display: 'flex', justifyContent: 'space-evenly' }}>
                            <img src={product.image} width={30} height={30} />
                            <p>{product.title}</p>
                            <p>{product.description && product.description.length > 50 ? `${product.description.slice(0, 50)}...` : product.description}</p>
                            <p>${product.price}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
            
            </div>
  



    
          
          
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
