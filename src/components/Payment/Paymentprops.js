import React from 'react'
import {toast} from 'react-toastify';

import { IoCloseOutline } from 'react-icons/io5';
 const Paymentprops = (  {setModel} ) => {
   return (
     <div>
                <div className="bg-gray-200 p-4 flex flex-col justify-center items-center m-6" 
                    style={{ 
                        left: 0 , right: 0 ,
                
                        borderRadius: "1.5rem"
                        , 
                        // position: "absolute"

                        //  marginRight: "30rem"
                      }}>


          



  <div  className="flex space-x-2 ">
    
    <button onClick={()=> { localStorage.setItem('region', 'global'); toast.success('Payment Change to Global(USD)', {autoClose:2000}) } } className="flex items-center space-x-2">
      <img
        src= "https://jooinn.com/images/world-globe-logo-4.png"
        alt="Image 1"
        className="w-6 h-6"
      />
      <span className="text-gray-700">Global</span>
    </button>



    <button onClick={()=> { localStorage.setItem('region', 'eu');  toast.success('Payment Change to Europe', {autoClose:2000})}} className="flex items-center space-x-2 ">
      <img
        src="https://c8.alamy.com/comp/HEDMCJ/red-arrow-pointing-monaco-on-the-map-of-europe-continent-HEDMCJ.jpg"
        alt="Image 2" 
        className="w-6 h-6"
      />
      <div className="text-gray-700">Europe</div>
    </button>
      <div className="offcanvas-top flex ">
                    <button
               
                        type="button"
                        className="offcanvas-close-btn text-[32px]"
                        aria-label="left Align"
                    >
                        <IoCloseOutline onClick={()=> setModel(false)} />
                    </button>
                </div>
  </div>


  
  
</div>



     </div>
   )
 }
 
 export default Paymentprops