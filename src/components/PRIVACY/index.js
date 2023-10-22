import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';

function privacy({ faqItems, title, desc }) {
    const [selected, setSelected] = useState({});
    const toggle = (items) => {
        if (selected === items) {
            setSelected({});
            return;
        }

        setSelected(items);
    };
    return (
        <div className="faq text-center border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]">
            <div className="container max-w-4xl">

            <h1>Privacy Policy</h1>

<p>


Mesob International built the Mesob app as a Commercial app. This SERVICE is provided by 
Mesob International and is intended for use as is.

This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to 
use our Service.

If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal 
Information that we collect is used for providing and improving the Service. 
Mesob International will not use or share your information with anyone except as described in this Privacy Policy.

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Mesob unless otherwise defined in this Privacy Policy.
</p>


<h1>Information Collection and Use</h1>

<p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, 
including but not limited to 
Mesob International. The information that we request will be retained on your device and is not collected by 
Mesob International in any way.

The app does use third-party services that may collect information used to identify you.

Link to the privacy policy of third-party service providers used by the app</p>


<h1>Google Play Services
Log Data</h1>

<p>Mesob International want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information 
(through third-party products) on your phone called Log Data. This Log Data may include information such as your device 
Internet Protocol (â€œIPâ€) address, device name, operating system version, the configuration of the app when utilizing our Service,
the time and date of your use of the Service, and other statistics.
</p>


<h1>Cookies</h1>

<p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser 
from the websites that you visit and are stored on your device's internal memory.

This Service does not use these â€œcookiesâ€ explicitly. However, the app may use third-party code and libraries that use â€œcookiesâ€ to collect 
information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. 
If you choose to refuse our cookies, you may not be able to use some portions of this Service.</p>



<h1>Service Providers</h1>

<p>Mesob International may employ third-party companies and individuals due to the following reasons:

To facilitate our Service;
To provide the Service on our behalf;
To perform Service-related services; or
To assist us in analyzing how our Service is used.

Mesob International want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks 
assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</p>


                <h2 className="mb-[10px]">{title}</h2>
                <p className="mb-[45px]">{desc}</p>
                <div className="accorddion p-[15px] -m-[15px]">

        </div>
            </div>
        </div>
    );
}

privacy.propTypes = {
    faqItems: PropTypes.instanceOf(Object).isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};

export default privacy;
