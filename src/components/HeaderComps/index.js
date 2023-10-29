import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchBarComps from '../SearchBarComps';
import LogoComps from '../LogoComps';
import HeaderRight from './HeaderRightSide';

function HeaderOne({ headerItems, headerContainer }) {
    // Header Sticky Activation
    const header = useRef();
    useEffect(() => {
        window.addEventListener('scroll', isSticky);

        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;

        scrollTop >= 90
            ? header.current?.classList.add('is-sticky')
            : header.current?.classList.remove('is-sticky');
    };
    //   End Here

    return (
        <>
       <header
            ref={header}
            className="flex items-center w-full h-[55px] top-0 z-30"
            style={{backgroundColor:'black'}}
        >
            {/* <div className={'container-fluid'} >
                <div className="grid grid-cols-12">
                <div class="lm:col-span-2 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2">

                        <LogoComps
                            headerItems={headerItems}
                            headerLogoCName="flex lm:justify-center"
                            logoPath="/"
                        />
                    </div>
                    <div className="col-span-8  sm:block lg:block">

                        <SearchBarComps placeholdertext="Search Anything..." />
                    </div>
                   
                    <div class="lm:col-span-2 col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 self-center">
                        <HeaderRight headerItems={headerItems} />
                    </div>
                </div>
            </div> */}

            <div className={'container-fluid'}>
                <div className="grid grid-cols-12" style={{paddingInline:'0.5%'}}>
                    <div className="col-span-3 xs:col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-2 self-center">
                        <LogoComps
                            headerItems={headerItems}
                            headerLogoCName="flex justify-center"
                            logoPath="/"
                        />
                    </div>
                    <div className="col-span-7 xs:col-span-7 sm:col-span-7 md:col-span-9 lg:col-span-9 xl:col-span-9">
                        <SearchBarComps placeholdertext="Search Anything..." />
                    </div>
                    <div className="col-span-2 xs:col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 self-center">
                        <HeaderRight headerItems={headerItems} />
                    </div>
                </div>
            </div>



            

        </header>
          </>
    );
}

HeaderOne.propTypes = {
    headerItems: PropTypes.instanceOf(Object).isRequired,
    headerContainer: PropTypes.string,
};

export default HeaderOne;
