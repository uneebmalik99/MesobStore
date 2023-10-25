import PropTypes from 'prop-types';
import { useState , useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import * as queries from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

function SearchBarComps({ placeholdertext }) {
const [searchString , setsearchString] = useState('')
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
            <div className=" input-field relative max-w-[270px]" style={{display:'flex',alignItems:'center', justifyContent:'center', backgroundColor:'white',paddingInline:5, borderRadius:10}}>
                <input
                    type="search"
                    name="search"
                    placeholder={placeholdertext}
                    onChange={(e) => setsearchString(e.target.value)}
                    className="bg-transparent border-0 border-b border-[rgba(0,0,0,.25)] outline-none w-full p-[4px_35px_4px_0] focus-visible:border-primary"
                />
               
                <button
                    type="submit"
                    style={{backgroundColor:'orange',paddingInline:'3%',borderTopRightRadius:10, borderBottomRightRadius:10, height:'100%'}}
                    onClick={searchproduct}
                    className="absolute right-0 text-2xl"
                >
                    <IoSearchOutline />
                </button>
            </div>
   
        </>
    );
}

SearchBarComps.propTypes = {
    placeholdertext: PropTypes.string.isRequired,
};

export default SearchBarComps;
