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
            <div className={'container-fluid'} >
                <div className="grid grid-cols-12">
                <div className="lm:col-span-2 col-span-2">
                        <LogoComps
                            headerItems={headerItems}
                            headerLogoCName="flex lm:justify-center"
                            logoPath="/"
                        />
                    </div>
                    <div class="col-span-8  hidden lm:block">
                        <SearchBarComps placeholdertext="Search Anything..." />
                    </div>
                   
                    <div class="lm:col-span-2 col-span-2 self-center">
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
