import Head from 'next/head';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Alert, Authenticator, Button } from '@aws-amplify/ui-react';
// import Amplify from '@aws-amplify/core';
import store from '../store/index';

import Layout from '../components/Layout';
import '../styles/globals.css';
import { ScrollToTop } from '../components/ScrollComps';

import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const persistor = persistStore(store);
Amplify.configure(awsExports);

function MyApp({ Component, pageProps }) {
    console.log('This is app.js');
    console.log(
        'Current Authenticated User: ',
        Auth.currentAuthenticatedUser()
        

    );
    let gg= Auth.currentAuthenticatedUser();
    

    useEffect(() => {
        currentSession()
    }, []);
async function currentSession() {
  try {
    const data = await Auth.currentSession();
    console.log("dddd "+data);
    
  } catch(err) {

    console.log("dderrordd "+err);
  }
};

    console.log("Auth  user is "+gg);
    console.log("Auth  user is data"+gg);

    const handleSignIn = (state) => {
        if (state === 'signedin') {
            const user = Auth.user;
            console.log('User information: ', user);
            try {
                localStorage.setItem('userData', JSON.stringify(user));
                console.log('User data stored in local storage');
            } catch (error) {
                console.log('Error saving user data in local storage');
            }
        }
    };
    return (
        // <Authenticator onStateChange={handleSignIn}>
        //     {({ signOut, user }) => (
        <Layout>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Mesob Store</title>
                <meta
                    name="description"
                    content="Are you looking for an awesome E-commerce React Template? Mesobstore is a minimal and modern design React ecommerce template. It has been built using the latest version of React JS and Next JS."
                />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
            <ScrollToTop />

            <ToastContainer />

            {/* <Button
                onClick={() => {
                    console.log('User is: ', user);
                    try {
                        localStorage.setItem('userData', JSON.stringify(user));
                        console.log('User data stored in local storage');
                    } catch (error) {
                        console.log('Error saving user data in local storage');
                    }
                    signOut();
                }}
            >
                Signout
            </Button> */}
        </Layout>
        //     )}
        // </Authenticator>
    );
}

MyApp.propTypes = {
    Component: PropTypes.instanceOf(Object).isRequired,
    pageProps: PropTypes.instanceOf(Object).isRequired,
};

export default MyApp;
