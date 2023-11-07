import PropTypes from 'prop-types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { withAuthenticator, Authenticator, Button, components } from '@aws-amplify/ui-react'; 
import { Amplify,API, Hub,graphqlOperation, Auth } from 'aws-amplify';
import _ from 'lodash';
import * as queries from '../../graphql/queries';
import CustomSignInButton from './CustomSignInButton';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from "../../aws-exports";
import {toast} from 'react-toastify';


const inputField = `border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]`;
const secondaryButton =
    'flex items-center justify-center bg-primary text-white leading-[38px] text-[15px] h-[50px] w-full  transition-all hover:bg-[#212529] px-[40px]';


    // Amplify.configure(awsconfig.oauth.redirectSignIn="http://localhost:3000/");
function AuthForm({ authItems }){
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


    // async function urlOpener(url, redirectUrl) {
    //     try {
    //       await InAppBrowser.isAvailable();
    //       console.log('URL2', url, redirectUrl);
      
    //       console.log('InAppBrowser.openAuth', InAppBrowser.openAuth);
      
    //       const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    //         dismissButtonStyle: 'cancel',
    //         preferredBarTintColor: '#453AA4',
    //         preferredControlTintColor: 'white',
    //         readerMode: false,
    //         animated: true,
    //         modalPresentationStyle: 'fullScreen',
    //         modalTransitionStyle: 'coverVertical',
    //         modalEnabled: true,
    //         enableBarCollapsing: false,
    //         // Android Properties
    //         showTitle: true,
    //         toolbarColor: '#6200EE',
    //         secondaryToolbarColor: 'black',
    //         navigationBarColor: 'black',
    //         navigationBarDividerColor: 'white',
    //         enableUrlBarHiding: true,
    //         enableDefaultShare: true,
    //         forceCloseOnRedirection: false,
    //       });
    //       console.log('URL3', type, url);
      
    //       console.log('type==', type);
    //       if (type === 'success') {
    //         Linking.openURL(newUrl);
    //         // Alert.alert(type)
    //       }
    //       if(type == 'cancel'){
    //         setFbLoading(false);
    //     setAppleLoading(false);
    //     setGoogleLoading(false);
    //       }
    //     } catch (error) {
    //       console.log('error==', error);
    //     }
    //   }
      
    //   Amplify.configure({
    //     ...awsConfig,
    //     oauth: {
    //       ...awsConfig.oauth,
    //       urlOpener,
    //     },
    //   });

    const handleSignUp = async () => {
        console.log('Email. Pass: ', signInEmail + signInPassword);
        try {
            const response = await Auth.signUp(signInEmail, signInPassword, signInEmail);
            console.log('jfashkuhfhksduhfs',response);
            if(response.username == signInEmail){
                toast.success('Sign Up Successfully', {autoClose:2000})

            window.location.href = '/'
            }else{
                alert(response)
            }

            console.log('SignUp Done');
        } catch (e) {
            alert(e)
            console.log('jfashkuhfhksduhfs Error', e);
        }
    };
    const handleSignIn = async () => {
        try {
            const response = await Auth.signIn(signInEmail, signInPassword);
            console.log(`Login Response: ${JSON.stringify(response.username)}`);
            if(response.userSub){

                window.location.href = '/'

            }
        } catch (e) {
            console.log('Error: ', JSON.stringify(e));
            alert(`Error: ${e.message}`);
        }
    };
    const authTab = (index) => {
        setAuthTabState(index);
    };


    const components = [
        // Other components you may need
        {
          name: 'SignIn',
          component: CustomSignInButton, // Use your custom sign-in button component
        },
        // Other components
      ];

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



                <button
                            className="button-wrap"
                            type="submit"
                            onClick={()=> {
                                console.log('hjgjgjugugu')
                                Auth.federatedSignIn({provider:CognitoHostedUIIdentityProvider.Facebook}) 
                            }}
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
                        </button>
                     
                        <button
                            className="button-wrap"
                            onClick={()=> {
                                console.log('hjgjgjugugu')
                                Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google}) 
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
                          onClick={()=> {
                            console.log('hjgjgjugugu')
                            Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Apple}) 
                        }}
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
                        </button>
                    <div >
                    <h3 className="title text-center text-[18px] mt-[25px] mb-[25px]">
                           OR 
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

                    
                    </div>
                </div>

                {/* <Authenticator components={components}>
            {({ signOut, user }) => (

                window.location.href = '/'
            )}
        </Authenticator> */}
                <div
                    className={
                        authTabState === 2
                            ? 'Register-content tab-style-common active'
                            : 'Register-content tab-style-common'
                    }
                >
                        <h3 className="title text-[18px] mb-[25px]">
                            Register An Account
                        </h3>

                        <div className="single-field mb-[30px]">
                            <input
                                className={inputField}
                                type="email"
                                value={signInEmail}
                                onChange={(event) => {
                                    setSign(event.target.value);
                                }}
                                placeholder="Email address"
                            />
                        </div>
                        <div className="single-field">
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
                </div>
            </div>
        </div>

    );
}

AuthForm.propTypes = {
    authItems: PropTypes.instanceOf(Object).isRequired,
};

export default AuthForm;
// export default withAuthenticator(AuthForm, {
//     socialProviders: ['apple','google']
//   })
