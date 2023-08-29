import { useState } from 'react';
import Link from 'next/link';
import { IoCaretDownOutline } from 'react-icons/io5';
import { OffcanvasData } from './OffcanvasMenuData';

import { Auth } from '@aws-amplify/auth';
import { useEffect } from 'react';

function OffcanvasMenu() {

    const [userauth, setuserauth] = useState('0')
    const [submenuOpenId, setSubmenuOpenId] = useState({});

    const showSubmenuClickHandler = (id) =>
        setSubmenuOpenId((prevData) => ({
            [id.toString()]: !prevData[id.toString()],
        }));

    const [levelTwoOpenId, setLevelTwoOpenId] = useState({});

    const showLevelTwoClickHandler = (id) =>
        setLevelTwoOpenId((prevData) => ({
            [id.toString()]: !prevData[id.toString()],
        }));


        const signout = () => {
            Auth.signOut().then(() => {
                window.location.href = '/';

            });
          };


    async function currentSession() {
        try {
            const data = await Auth.currentSession();
            console.log("dddd "+data);
            if(data){
                setuserauth('1')
            }
            
        } catch(err) {
            setuserauth('0')

            console.log("dderrordd "+err);
        }
        };



        useEffect(() => {
            currentSession()
        }, []);
        if(userauth == "1"){
            return (
                <ul className="offcanvas-menu-items pt-[40px]">
                 <li>
                 <Link href=''>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Home
                                            </a>
                                        </Link>
                    </li>

                    <li>
                 <Link href=''>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Purchases
                                            </a>
                                        </Link>
                    </li>

                    <li>
                 <Link href=''>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                My Orders
                                            </a>
                                        </Link>
                    </li>

                    <li>
                 <Link href=''>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Setting Account
                                            </a>
                                        </Link>
                    </li>

                    <li>
                 <Link href='/contact'>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Contact us
                                            </a>
                                        </Link>
                    </li>

                    <li>
                 <Link href='/about'>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                About Mesob Store
                                            </a>
                                        </Link>
                    </li>
                    <li>
                    <button > Delete Account </button>
{/* 
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Delete Account 
                                            </a> */}
                                      
                    </li>


                   
                    <li>
                 <Link href=''>
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Change Payment Zone 
                                            </a>
                                        </Link>
                                        
                    </li>
                    <li>
                    <button  onClick={()=> {signout()}}> Signout </button>
{/* 
                                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Delete Account 
                                            </a> */}
                                      
                    </li>

                </ul>
            );
        }else{

            return(
                <>
                <div style={{marginTop:'10%'}}>
                 
                        <ul>
                        <Link
                        href={`/`} >
                              <a className="transition-all hover:text-[#666666]">
                                  Home
                                  </a>
                    </Link>
                        </ul>

                        <ul>
                        <Link
                        href={`/auth`} >
                              <a className="transition-all hover:text-[#666666]">
                                  Sign In Or Register
                                  </a>
                    </Link>
                        </ul>
              

                  
                </div>
                </>
            )

        }
  
}

export default OffcanvasMenu;
