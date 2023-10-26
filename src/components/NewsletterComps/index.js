import PropTypes from 'prop-types';
import Link from 'next/link';

function NewsletterComps({ sectionTitle }) {
    return (
        <div className="newsletter-area" style={{paddingBottom:'5%' , paddingTop:'5%'}}>
            <div className="container">


                <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}  >
                <p style={{paddingInline:'22%'}}>{sectionTitle}</p>

                <button
                onClick={()=> {window.location.href = '/contact'}}
                style={{backgroundColor:'black',marginTop:'2%', alignSelf:'center',  paddingBlock:'2%', paddingInline:'10%', color:'white'}}
                            type="submit"
                        >
                            Subscribe
                        </button>


                </div>
                {/* <div className="grid md:grid-cols-1">
                <div  className="section-title pb-[10px] md:mb-0 mb-[30px] relative after:bg-primary after:absolute after:left-0 after:transform after:bottom-0 after:h-[4px] after:w-[70px]"
                  
                    >
                        <p style={{paddingInline:'35%'}}>{sectionTitle}</p>


                    </div>
                   
                   
                </div> */}
               
            </div>
        </div>
    );
}

NewsletterComps.propTypes = {
    sectionTitle: PropTypes.string.isRequired,
};

export default NewsletterComps;
