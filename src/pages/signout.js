import PropTypes from 'prop-types';
import HeaderOne from '../components/HeaderComps';
import Breadcrumb from '../components/Breadcrumb';
import AuthForm from '../components/Auth/AuthForm';
import FooterComps from '../components/FooterComps';
import { getAllItems } from '../lib/ItemsUtil';

function Signout({ headerItems, authItems, footerItems }) {

    
    return (
        <>
            <HeaderOne headerItems={headerItems} headerContainer="container" />
          
            <FooterComps
                footerContainer="container"
                footerItems={footerItems}
            />
        </>
    );
}

export function getStaticProps() {
    const headerItems = getAllItems('header');
    const authItems = getAllItems('auth-data');
    const footerItems = getAllItems('footer');

    return {
        props: {
            headerItems,
            authItems,
            footerItems,
        },
    };
}

Signout.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    authItems: PropTypes.instanceOf(Object).isRequired,
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default Signout;
