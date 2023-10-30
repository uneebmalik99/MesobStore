import PropTypes from 'prop-types';
import { useState , useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import * as queries from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useSelector } from 'react-redux';

function SearchBarComps({ placeholdertext }) {
const cartItems = useSelector((state) => state.cart.searchitems);

const [searchString , setsearchString] = useState('')

console.log("sdnjknsdknvds", cartItems);


const manyItems = [...new Array(10000)].map((_, i) => ({
    id: i,
    name: `something${i}`,
    description:
      "Some description text, where the search will be performed too.",
  }));

  const movieItems = [
    {
      id: 0,
      title: "Titanic",
      description: "A movie about love",
    },
    {
      id: 1,
      title: "Dead Poets Society",
      description: "A movie about poetry and the meaning of life",
    },
    {
      id: 2,
      title: "Terminator 2",
      description: "A robot from the future is sent back in time",
    },
    {
      id: 3,
      title: "Alien 2",
      description: "Ripley is back for a new adventure",
    },
  ];

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = async (item) => {
    console.log('clicked or selected',item.id);

    try {
        const response = await API.graphql(
            graphqlOperation(queries.getProducts, { id: item.id })
        );
        const allProducts = response.data.getProducts;

        console.log('search product ',allProducts);
        const contentObj = JSON.parse(allProducts.content);

        if(allProducts.isRecommended == true && allProducts.off_percentage != null){
     
          let tprice = contentObj.price.replace('$', ''); // This removes the dollar sign
       tprice = tprice.replace(/,/g, '');

       let off  = allProducts.off_percentage.slice(0, -1);

       let discount = (off / 100) * tprice;


     let priceAfterDiscountv = (tprice - discount).toFixed(2);
     console.log("gcchc",priceAfterDiscountv );


     window.location.href = '/products/slug?id='+ allProducts.id+'&title='+ allProducts.title +'&image='+ contentObj.image +'&des='+ contentObj.description + '&price='+ contentObj.price + '&newprice='+ priceAfterDiscountv+ '&category='+ allProducts.category +'&isRecommended='+allProducts.isRecommended+'&off_percentage='+allProducts.off_percentage ;

        }else{
          window.location.href = '/products/slug?id='+ allProducts.id+'&title='+ allProducts.title +'&image='+ contentObj.image +'&des='+ contentObj.description + '&price='+ contentObj.price +'&category='+ allProducts.category +'&isRecommended='+allProducts.isRecommended+'&off_percentage='+allProducts.off_percentage ;

        }




    } catch (error) {
        console.error('Error fetching products:', error);
    }
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">name: {item.title}</span>
      </div>
    );
  };
// const [filterProducts, setFilterProducts] = useState<any>([]);

    // useEffect(() => {
    //     if (!searchString.length) {
    //       setFilterProducts([]);
    //       return;
    //     }
    
    //     setFilterProducts(
    //       products.filter(item =>
    //         item.title.toLowerCase().includes(searchString.toLowerCase()),
    //       ),
    //     );
    //   }, [searchString]);


const searchproduct = async() => {

  if(searchString.length>0){
    const dataToSend = { search: searchString };

    // Convert the data to a query string
    const queryString = Object.keys(dataToSend)
      .map((key) => key + '=' + dataToSend[key])
      .join('&');
    
    // Append the query string to the URL and navigate
    window.location.href = '/search?' + queryString;
  }


}

    return (
        <>
           <div>

           <ReactSearchAutocomplete
            items={cartItems}
            fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
            resultStringKeyName="title" // String to display in the results
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            styling={{ zIndex: 4,}} // To display it on top of the search box below
            autoFocus
          />
          <pre style={{ textAlign: 'left' }}>
          </pre>
      
    
{/* <ReactSearchAutocomplete
            items={movieItems}
            fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
            resultStringKeyName="title" // String to display in the results
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            showIcon={false}
            styling={{
              height: "34px",
              border: "1px solid darkgreen",
              borderRadius: "4px",
              backgroundColor: "white",
              boxShadow: "none",
              hoverBackgroundColor: "lightgreen",
              color: "darkgreen",
              fontSize: "12px",
              fontFamily: "Courier",
              iconColor: "green",
              lineColor: "lightgreen",
              placeholderColor: "darkgreen",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }}
          /> */}

            {/* <button
                    type="submit"
                    style={{backgroundColor:'orange',paddingInline:'1%',borderTopRightRadius:10, borderBottomRightRadius:10, height:'100%'}}
                    onClick={searchproduct}
                    className=" right-0 text-2xl"
                >
                    <IoSearchOutline />
                </button> */}

    </div>

            {/* <div className=" input-field relative" style={{display:'flex',alignItems:'center', justifyContent:'center', backgroundColor:'grey',paddingInline:5, borderRadius:10}}>
                <input
                    type="search"
                    name="search"
                    placeholder={placeholdertext}
                    onChange={(e) => setsearchString(e.target.value)}
                    className="bg-transparent border-0 border-b border-[rgba(0,0,0,.25)] outline-none  p-[4px_35px_4px_5px] focus-visible:border-primary"
                />


               
                <button
                    type="submit"
                    style={{backgroundColor:'orange',paddingInline:'3%',borderTopRightRadius:10, borderBottomRightRadius:10, height:'100%'}}
                    onClick={searchproduct}
                    className="absolute right-0 text-2xl"
                >
                    <IoSearchOutline />
                </button>
            </div> */}
   
        </>
    );
}

SearchBarComps.propTypes = {
    placeholdertext: PropTypes.string.isRequired,
};

export default SearchBarComps;
