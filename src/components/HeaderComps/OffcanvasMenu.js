import { useState } from 'react';
import Link from 'next/link';
import { IoCaretDownOutline } from 'react-icons/io5';
import { OffcanvasData } from './OffcanvasMenuData';

import { Auth } from '@aws-amplify/auth';
import { useEffect } from 'react';
import Paymentprops from '../Payment/Paymentprops';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OffcanvasMenu() {
    const [userauth, setuserauth] = useState('0');
    const [submenuOpenId, setSubmenuOpenId] = useState({});
    const [Model, setModel] = useState(false);

    const showSubmenuClickHandler = (id) =>
        setSubmenuOpenId((prevData) => ({
            [id.toString()]: !prevData[id.toString()],
        }));

    const [levelTwoOpenId, setLevelTwoOpenId] = useState({});

    const delalert = () => {
        const result = window.confirm('Do you want to delete Your Account?');

        if (result) {
            // User clicked "OK"
            deleteUser();
        } else {
            // User clicked "Cancel" or closed the dialog
        }
    };
    const onLogOutPress = () => {
        Auth.signOut().then(() => {});
    };
    async function deleteUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            console.log('user ' + user);
            const result = await user.deleteUser();
            console.log('user  del' + result);
            await onLogOutPress();
            console.log(result);

            toast.success('Account deleted Successfully!', { autoClose: 2000 });
        } catch (error) {
            console.log('Error deleting user', error);
        }
    }

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
            console.log('dddd ' + data);
            if (data) {
                setuserauth('1');
            }
        } catch (err) {
            setuserauth('0');

            console.log('dderrordd ' + err);
        }
    }

    useEffect(() => {
        currentSession();
    }, []);

    function dialogbox() {
        setModel(true);
    }

    if (userauth == '1') {
        return (
            <>
                {/* <div >



            </div> */}

                <ul className="offcanvas-menu-items pt-[40px]">
                    <li
                        style={{
                            paddingBlock: '2%',
                            borderBottomWidth: 0.5,
                            borderColor: '#D0D3D4',
                        }}
                    >
                        <Link href="/">
                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                Home
                            </a>
                        </Link>
                    </li>

                    {/* <li style={{paddingBlock:'2%', borderBottomWidth:0.5, borderColor:'#D0D3D4'}}>
                 <Link href=''>
                                            <a onClick={()=> {          toast.success('Coming Soon', {autoClose:1000})
}} className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Purchases
                                            </a>
                                        </Link>
                    </li> */}

                    <li
                        style={{
                            paddingBlock: '2%',
                            borderBottomWidth: 0.5,
                            borderColor: '#D0D3D4',
                        }}
                    >
                        <Link href="/orders">
                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                My Orders
                            </a>
                        </Link>
                    </li>

                    {/* <li style={{paddingBlock:'2%', borderBottomWidth:0.5, borderColor:'#D0D3D4'}}> 
                 <Link href=''>
                                            <a onClick={()=> {   toast.success('Coming Soon', {autoClose:1000})}} className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Setting Account
                                            </a>
                                        </Link>
                    </li> */}

                    <li
                        style={{
                            paddingBlock: '2%',
                            borderBottomWidth: 0.5,
                            borderColor: '#ECF0F1',
                        }}
                    >
                        <Link href="/contact">
                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                Contact us
                            </a>
                        </Link>
                    </li>

                    <li
                        style={{
                            paddingBlock: '2%',
                            borderBottomWidth: 0.5,
                            borderColor: '#D0D3D4',
                        }}
                    >
                        <Link href="/about">
                            <a className="flex justify-between items-center transition-all hover:text-[#666666]">
                                About Mesob Store
                            </a>
                        </Link>
                    </li>
                    <li
                        style={{
                            paddingBlock: '2%',
                            borderBottomWidth: 0.5,
                            borderColor: '#D0D3D4',
                        }}
                    >
                        <Link href="">
                            <a
                                onClick={() => {
                                    delalert();
                                }}
                                className="flex justify-between items-center transition-all hover:text-[#666666]"
                            >
                                Delete Account
                            </a>
                        </Link>
                    </li>

                    {/* <li style={{paddingBlock:'2%', borderBottomWidth:0.5, borderColor:'#D0D3D4'}}>
                 <Link href=''>


                                            <a 
                                            
                                            onClick={dialogbox}

                                            className="flex justify-between items-center transition-all hover:text-[#666666]">
                                                Change Payment Zone 
                                            </a>
                                        </Link>

                                        {Model ? (

                                    

                            <Paymentprops   setModel ={setModel}/>
                                ) : null}
                                        
                    </li> */}
                    <li
                        style={{
                            paddingBlock: '2%',
                            borderBottomWidth: 0.5,
                            borderColor: '#D0D3D4',
                        }}
                    >
                        <Link href="">
                            <a
                                onClick={() => {
                                    signout();
                                }}
                                className="flex justify-between items-center transition-all hover:text-[#666666]"
                            >
                                Signout
                            </a>
                        </Link>
                    </li>
                </ul>
            </>
        );
    } else {
        return (
            <>
                <div style={{ marginTop: '10%' }}>
                    <ul>
                        <Link href={`/`}>
                            <a className="transition-all hover:text-[#666666]">
                                Home
                            </a>
                        </Link>
                    </ul>

                    <ul>
                        <Link href={`/auth`}>
                            <a className="transition-all hover:text-[#666666]">
                                Sign In Or Register
                            </a>
                        </Link>
                    </ul>
                </div>
            </>
        );
    }
}

export default OffcanvasMenu;
