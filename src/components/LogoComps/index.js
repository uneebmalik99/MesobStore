import Link from 'next/link';
import PropTypes from 'prop-types';

function LogoComps({ headerItems, headerLogoCName, logoPath }) {
    return (
        <div className={`${headerLogoCName}`}>
            <Link href={logoPath}>
                <a className="block" style={{display:'flex', flexDirection:'row'}}>
                    <img
                        src={headerItems[0]?.headerLogo[0]?.darkLogo}
                        alt={headerItems[0]?.headerLogo[0]?.darkLogoAlt}
                        style={{borderRadius:10 ,width:40, height:40}}
                        width={12}
                        height={12}
                    />
                    <h3 style={{ color: 'black',marginLeft:5, textAlign:'center' }}>Mesob Store</h3>
                </a>
            </Link>
        </div>
    );
}

LogoComps.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    headerLogoCName: PropTypes.string.isRequired,
    logoPath: PropTypes.string.isRequired,
};

export default LogoComps;
