import Link from 'next/link';
import PropTypes from 'prop-types';

function LogoComps({ headerItems, headerLogoCName, logoPath }) {
    return (
        <div className={`${headerLogoCName}`}>
            <Link href={logoPath}>
                <a className="block" style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <img
                        src={headerItems[0]?.headerLogo[0]?.darkLogo}
                        alt={headerItems[0]?.headerLogo[0]?.darkLogoAlt}
                        style={{borderRadius:10 , width:40, height:40}}
                       
                    />
                    {/* <p className='pd' style={{ color: 'white',marginLeft:5, textAlign:'center' , fontSize:calc(100% + 1vw + 1vh) }}>Mesob Store</p> */}

                    <p className='pd' style={{ color: 'white',  textAlign: 'center', fontSize: 'calc(20% + 0.5vw + 1vh)' }}>Mesob Store</p>
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
