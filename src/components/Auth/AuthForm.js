import PropTypes from 'prop-types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { Auth } from 'aws-amplify';
import { withAuthenticator, Authenticator, Button } from '@aws-amplify/ui-react';
import { Amplify,API, Hub,graphqlOperation, Auth } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import _ from 'lodash';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import awsConfig from '../../aws-exports';

const inputField = `border border-[#cccccc] focus-visible:outline-0 text-[#666666] py-[10px] px-[20px] w-full h-[50px]`;
const secondaryButton =
    'flex items-center justify-center bg-primary text-white leading-[38px] text-[15px] h-[50px] w-full  transition-all hover:bg-[#212529] px-[40px]';


const isLocalhost = true;





    // const isLocalhost = Boolean(
       
    //     window.location.hostname === "localhost" ||
    //       // [::1] is the IPv6 localhost address.
    //       window.location.hostname === "[::1]" ||
    //       // 127.0.0.1/8 is considered localhost for IPv4.
    //       window.location.hostname.match(
    //         /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    //       )
    //   );
      

      const [
        localRedirectSignIn,
        productionRedirectSignIn,
      ] = awsConfig.oauth.redirectSignIn.split(",");
      
      const [
        localRedirectSignOut,
        productionRedirectSignOut,
      ] = awsConfig.oauth.redirectSignOut.split(",");
      
      const updatedAwsConfig = {
        ...awsConfig,
        oauth: {
          ...awsConfig.oauth,
          redirectSignIn: isLocalhost ? 'http://localhost:3000/' :"http://localhost:3000/" ,
          redirectSignOut: isLocalhost ? "http://localhost:3000/" : "http://localhost:3000/",
        }
      }
      
      Amplify.configure(updatedAwsConfig);
    //   Amplify.configure(awsConfig);

      

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
    const [user, setUser] = useState(null);
    const [customState, setCustomState] = useState(null);

    // useEffect(() => {
    //     Hub.listen('auth', ({ payload: { event, data } }) => {
    //       switch (event) {
    //         case 'signIn':
    //         case 'cognitoHostedUI':
    //         //   getUser().then(userData => setUser(userData));
    //           break;
    //         case 'signOut':
    //           setUser(null);
    //           break;
    //         case 'signIn_failure':
    //         case 'cognitoHostedUI_failure':
    //           console.log('Sign in failure', data);
    //           break;
    //       }
    //     });
    
    //     // getUser().then(userData => setUser(userData));
    //   }, []);
    // async function urlOpener(url, redirectUrl) {
    //    console.log('jdbvdsbdvbdkjbd',redirectUrl, "       knmkm  ",url)
    //     try {
    //       // Check if the InAppBrowser is available for the web
        
    //         // Open the URL in the web-specific InAppBrowser
    //         window.InAppBrowser.openAuth(url, redirectUrl)
    //           .then(({ type, url: newUrl }) => {
    //             console.log('type==', type);
    //             if (type === 'success') {
    //               // Redirect to the new URL on success
    //               window.location.href = newUrl;
    //             }
    //             if (type === 'cancel') {
    //               // Handle cancelation as needed
    //               console.log('Authentication canceled');
    //             }
    //           })
    //           .catch(error => {
    //             console.error('Error:', error);
    //           });
          
    //     } catch (error) {
    //       console.error('error==', error);
    //     }
    //   }
      

    //   Amplify.configure({
    //     ...awsConfig,
    //     oauth: {
    //       ...awsConfig.oauth,
    //       urlOpener,
    //     },
    //   });
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

    // useEffect(() => {
    //     const getUser = async () => {
    //       try {
    //         const authenticatedUser = await Auth.currentAuthenticatedUser();
    
    //         setUser(authenticatedUser);
    //       } catch {
    //             window.location.href = '/';
    //       }
    //     };
    
    //     getUser();
    //   }, []);

    // useEffect(() => {
        
    //     const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
    //       switch (event) {
    //         case "signIn":
    //           setUser(data);
    //           break;
    //         case "signOut":
    //           setUser(null);
    //           break;
    //         case "customOAuthState":
    //           setCustomState(data);
    //       }
    //     });

    //     Hub.listen('auth', (data) => { 
    //         if (data.payload.event === 'signIn_failure') {
    //             // Do something here
    //         }
    //     })
    
    //     Auth.currentAuthenticatedUser()
    //       .then(currentUser => setUser(currentUser))
    //       .catch(() => console.log("Not signed in"));
    
    //     return unsubscribe;
    //   }, []);

      


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
                {/* <ul className="auth-menu flex justify-center pb-[50px]">
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

                        <button
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
                        </button>
                        <button onClick={()=> {
                            Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
                        }}>
                            jfvv
                        </button>
                        <button
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
                        </button>
                    </form>
                </div> */}
    
                        <button onClick={()=> {
                            Auth.federatedSignIn({provider:"Google"});
                        }}>
                            Google
                        </button>

                        <button onClick={()=> {
                            Auth.federatedSignIn({provider:"Facebook"});
                        }}>
                            Facebook
                        </button>

                        <button onClick={()=> {
                            Auth.federatedSignIn({provider:"SignInWithApple"});
                        }}>
                            Apple
                        </button>



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
// export default withAuthenticator(AuthForm, {
//     socialProviders: ['apple','google']
//   })
