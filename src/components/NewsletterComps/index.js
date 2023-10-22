import PropTypes from 'prop-types';
import Link from 'next/link';

function NewsletterComps({ sectionTitle }) {
    return (
        <div className="newsletter-area" style={{paddingBottom:'5%' , paddingTop:'5%'}}>
            <div className="container">
                <div className="grid md:grid-cols-2">
                <div  className="section-title pb-[10px] md:mb-0 mb-[30px] relative after:bg-primary after:absolute after:left-0 after:transform after:bottom-0 after:h-[4px] after:w-[70px]"
                  
                    >
                        <p>{sectionTitle}</p>
                    </div>
                    <form className="newsletter-form relative">
                        {/* <input
                            className="w-full bg-[#f4f5f7] h-[54px] lm:p-[10px_170px_10px_20px] p-[10px] focus:outline-none"
                            type="email"
                            placeholder="Your email address"
                        /> */}
                              <Link href='/contact'>

                                
                          
                        <button
                            type="submit"
                            className="bg-black text-white md:w-[340px] lm:absolute lm:top-0 lm:right-0 px-[40px] h-[54px] max-sm:mt-[30px]"
                        >
                            Subscribe
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

NewsletterComps.propTypes = {
    sectionTitle: PropTypes.string.isRequired,
};

export default NewsletterComps;
