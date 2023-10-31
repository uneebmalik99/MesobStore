import { useEffect } from 'react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '../styles/globals.css';
import { ToastContainer, toast } from 'react-toastify';
import { ScrollToTop } from '../components/ScrollComps';
import Layout from '../components/Layout';
import store from '../store/index';
import awsConfig from '../aws-exports';
import 'react-toastify/dist/ReactToastify.css';

const persistor = persistStore(store);
// Amplify.configure(awsExports);
// Amplify.configure(awsExports.oauth.redirectSignIn="http://localhost:3000/");


// const updatedAwsConfig = {
//     ...awsConfig,
//     oauth: {
//       ...awsConfig.oauth,
//       redirectSignIn: 'http://localhost:3000/',
//       redirectSignOut: 'http://localhost:3000/',
//     },
//   };

  const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
      ...awsConfig.oauth,
      redirectSignIn:  'https://mesobstore.com/',
      redirectSignOut:  'https://mesobstore.com/',
    },
  };

  

 Amplify.configure(updatedAwsConfig);


function MyApp({ Component, pageProps }) {
    
    

    useEffect(() => {
        currentSession()
    }, []);
async function currentSession() {
  try {
    const data = await Auth.currentSession();
    console.log("current user : ", data);
    
  } catch(err) {
    console.log("current user session error ",err);

  }
};


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
