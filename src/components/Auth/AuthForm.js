import PropTypes from 'prop-types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { Auth } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../../../graphql/queries.js';
import _ from 'lodash';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';

const inputField = `border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]`;
const secondaryButton =
    'flex items-center justify-center bg-primary text-white leading-[38px] text-[15px] h-[50px] w-full  transition-all hover:bg-[#212529] px-[40px]';

function AuthForm({ authItems }) {
    // Auth Tab
    const [authTabState, setAuthTabState] = useState(1);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signInEmail, setSign] = useState('');
    const [signInPassword, setsignPass] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [useData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);

    console.log('Products in state are: ', products);

    useEffect(() => {
        console.log('UseEffect for fetching products');
        const fetchProducts = async () => {
            try {
                console.log('fetching products');
                const response = await API.graphql(
                    graphqlOperation(queries.listProducts)
                );
                const allProducts = response.data.listProducts.items;
                console.log('Response Products: ', allProducts);
                setProducts(
                    allProducts.map((item) => {
                        return _.pick(JSON.parse(item.content), [
                            'id',
                            'title',
                            'image',
                            'price',
                            'oldPrice',
                            'country',
                        ]);
                    })
                );
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSignUp = async () => {
        console.log('Email. Pass: ', email + password);
        try {
            const response = await Auth.signUp(email, password, email);
            console.log(response);
            console.log('SignUp Done');
        } catch (e) {
            console.log('Error', e.message);
        }
    };
    const handleSignIn = async () => {

        console.log('Signin: ', signInEmail, ' ', signInPassword);
        try {
            const response = await Auth.signIn(signInEmail, signInPassword);
            console.log(`Login Response: ${JSON.stringify(response)}`);
        } catch (e) {
            console.log('Error: ', JSON.stringify(e));
            alert(`Error: ${e.message}`);
        }
    };
    const authTab = (index) => {
        setAuthTabState(index);
    };
    return (
        <div className="border-b border-[#ededed] xl:py-[155px] lg:py-[100px] md:py-[80px] py-[50px]">
            <div className="container md:max-w-lg">
                <ul className="auth-menu flex justify-center pb-[50px]">
                    {authItems[0]?.authTabMenu?.map((singleTabMenu) => (
                        <li
                            key={singleTabMenu.id}
                            className={`${
                                authTabState === singleTabMenu.tabStateNo
                                    ? 'login active'
                                    : 'login text-[#666666]'
                            } mr-[45px] last:mr-0`}
                            onClick={() => authTab(singleTabMenu.tabStateNo)}
                        >
                            <span className="font-semibold cursor-pointer text-[24px] leading-[42px]">
                                {singleTabMenu.authMenuName}
                            </span>
                        </li>
                    ))}
                </ul>
                <div
                    className={
                        authTabState === 1
                            ? 'login-content tab-style-common active'
                            : 'login-content tab-style-common'
                    }
                >
                    <form className="login-form">
                        <h3 className="title text-[18px] mb-[25px]">
                            Login your account
                        </h3>
                        <div className="single-field mb-[30px]">
                            <input
                                className={inputField}
                                type="text"
                                value={signInEmail}
                                onChange={(event) => {
                                    setSign(event.target.value);
                                }}
                                placeholder="Username"
                            />
                        </div>
                        <div className="single-field mb-[30px]">
                            <input
                                className={inputField}
                                type="password"
                                value={signInPassword}
                                onChange={(event) => {
                                    setsignPass(event.target.value);
                                }}
                                placeholder="Password"
                            />
                        </div>
                        <div className="single-field flex justify-between items-center mb-[30px]">
                            <label className="flex" htmlFor="rememberme">
                                <input type="checkbox" id="rememberme" />
                                <span className="text-[14px] ml-[15px]">
                                    Remember me
                                </span>
                            </label>
                            <Link href="/lost-password">
                                <a className="text-[14px] font-normal transition-all hover:text-primary">
                                    Lost your password?
                                </a>
                            </Link>
                        </div>
                        <div className="button-wrap">
                            <button
                                type="submit"
                                id="signin"
                                className={secondaryButton}
                                onClick={handleSignIn}
                            >
                                Login
                            </button>
                        </div>

                        <div className="button-wrap " style={{ marginTop: 30 }}>
                            <p style={{ alignSelf: 'center' }} />
                        </div>

                        {/* <button
                            className="button-wrap"
                            type="submit"
                            style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 15,
                                width: '100%',
                                backgroundColor: '#536DFE',
                                alignSelf: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    padding: 8,
                                    flexDirection: 'row',
                                    width: '80%',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <img
                                    src="/images/user/facebook_icon.png"
                                    style={{ width: 30, height: 30 }}
                                />
                                <p
                                    style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        alignSelf: 'center',
                                    }}
                                >
                                    Login with Facebook
                                </p>
                            </div>
                        </button> */}
                        <button onClick={()=> {
                            Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
                        }}>
                            jfvv
                        </button>
                        {/* <button
                            className="button-wrap"
                            onClick={()=> {
                                console.log('hjgjgjugugu')
                                Auth.federatedSignIn({provider:'Facebook'}) 
                            }}
                            type="submit"
                            style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 15,
                                width: '100%',
                                alignSelf: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    padding: 8,
                                    flexDirection: 'row',
                                    width: '80%',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <img
                                    src="/images/user/google_icon.png"
                                    style={{ width: 30, height: 30 }}
                                />
                                <p
                                    style={{
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                    }}
                                >
                                    Login with Google
                                </p>
                            </div>
                        </button>

                        <button
                            className="button-wrap"
                            type="submit"
                            style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                marginTop: 15,
                                width: '100%',
                                alignSelf: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    padding: 8,
                                    flexDirection: 'row',
                                    width: '80%',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <img
                                    src="/images/user/apple_icon.png"
                                    style={{ width: 30, height: 30 }}
                                />
                                <p
                                    style={{
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                    }}
                                >
                                    Login with Apple
                                </p>
                            </div>
                        </button> */}
                    </form>
                </div>

                <Authenticator>
            {({ signOut, user }) => (

                window.location.href = '/'
            )}
        </Authenticator>
                <div
                    className={
                        authTabState === 2
                            ? 'Register-content tab-style-common active'
                            : 'Register-content tab-style-common'
                    }
                >
                    <form className="register-form">
                        <h3 className="title text-[18px] mb-[25px]">
                            Register An Account
                        </h3>

                        <div className="single-field mb-[30px]">
                            <input
                                className={inputField}
                                type="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                placeholder="Email address"
                            />
                        </div>
                        <div className="single-field">
                            <input
                                className={inputField}
                                type="password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                placeholder="Password"
                            />
                        </div>
                        <div className="single-field mt-[30px]">
                            <input
                                className={inputField}
                                type="text"
                                value={phoneNumber}
                                onChange={(event) => {
                                    setPhoneNumber(event.target.value);
                                }}
                                placeholder="Phone Number with Country code"
                            />
                        </div>
                        <p className="lg:max-w-[495px] mt-[20px] mb-[25px]">
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account, and for other purposes described in
                            our
                            <Link href="/privacy">
                                <a className="ml-[5px]">privacy policy.</a>
                            </Link>
                        </p>
                        <div className="button-wrap">
                            <button
                                type="submit"
                                className={secondaryButton}
                                onClick={handleSignUp}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

AuthForm.propTypes = {
    authItems: PropTypes.instanceOf(Object).isRequired,
};

export default AuthForm;
