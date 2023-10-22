import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
    IoLocationSharp,
    IoCallSharp,
    IoArrowForwardOutline,
} from 'react-icons/io5';
import * as FaIcons from 'react-icons/fa';
import PropTypes from 'prop-types';

function FooterCompsThree({ footerItems }) {
    const footer = useRef();
    useEffect(() => {
        window.addEventListener('scroll', isSticky);

        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    const isSticky = (e) => {
        const scrollTop = window.scrollY;

        scrollTop < 0
            ? footer.current.classList.add('is-sticky')
            : footer.current.classList.remove('is-sticky');
    };
    return (
        <footer
            className="sm:bg-[#f4f5f7] sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:w-full sm:z-[-1]"
            ref={footer}
        >
            <div className="footer-top xl:py-[115px] lg:py-[95px] md:py-[75px] py-[50px]">
                <div className="homecarousel-container md:mx-[100px] mx-[15px]">
                    <div className="grid grid-cols-12 sm:gap-x-[30px] max-md:gap-y-[30px]">
                        <div className="lg:col-span-3 sm:col-span-6 col-span-12 lg:self-center">
                            <div className="footer-widget">
                                <div className="footer-logo mb-[15px]">
                                    <Link href={footerItems[0]?.footerLogoPath}>
                                        <a>
                                            <img
                                                src={footerItems[0]?.footerLogo}
                                                alt={
                                                    footerItems[0]
                                                        ?.footerLogoAlt
                                                }
                                                width={120}
                                                height={30}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <ul>
                                    <li className="flex items-center mb-[5px]">
                                        <IoLocationSharp />
                                        <span className="ml-[10px]">
                                            {footerItems[0]?.address}
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <IoCallSharp />
                                        <Link
                                            href={footerItems[0]?.contactNumber}
                                        >
                                            <a className="font-normal hover:text-primary transition-all ml-[10px]">
                                                {
                                                    footerItems[0]
                                                        ?.contactNumberText
                                                }
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-3 sm:col-span-6 col-span-12">
                            <div className="footer-widget">
                                <h2 className="text-[18px] mb-[15px]">
                                    {footerItems[0]?.infoTitle}
                                </h2>
                                <ul>
                                    {footerItems[0]?.infoList?.map((item) => (
                                        <li
                                            className="mb-[5px] last:mb-0"
                                            key={item.id}
                                        >
                                            <Link href={item?.path}>
                                                <a className="font-normal transition-all hover:text-primary">
                                                    {item?.title}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-2 sm:col-span-6 col-span-12">
                            <div className="footer-widget">
                                <h2 className="text-[18px] mb-[15px]">
                                    {footerItems[0]?.aboutTitle}
                                </h2>
                                <ul>
                                    {footerItems[0]?.aboutList?.map((item) => (
                                        <li
                                            className="mb-[5px] last:mb-0"
                                            key={item.id}
                                        >
                                            <Link href={item?.path}>
                                                <a className="font-normal transition-all hover:text-primary">
                                                    {item?.title}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-4 sm:col-span-6 col-span-12">
                            <div className="footer-widget lm:max-w-[410px] mx-auto">
                                <h2 className="text-[18px] mb-[15px]">
                                    {footerItems[0]?.newsletterTitle}
                                </h2>
                                <form>
                                    <div className="input-field relative ">
                                        {/* <input
                                            type="email"
                                            name="email"
                                            placeholder="Your email address"
                                            className="bg-transparent border-0 border-b border-[rgba(0,0,0,.25)] outline-none w-full p-[10px_35px_10px_0] focus-visible:border-primary focus-visible:text-primary"
                                        /> */}
                                        <button
                                   
                                            type="submit"
                                            className="absolute top-1/2 -translate-y-1/2 right-0 text-[20px] text-[#99999] opacity-70"
                                        >
                                            <IoArrowForwardOutline />
                                        </button>
                                    </div>
                                </form>
                                <ul className="flex pt-[50px]">
                                    {footerItems[0]?.menuList?.map((item) => (
                                        <li
                                            className="xl:mr-[30px] mr-[20px] last:mr-0"
                                            key={item.id}
                                        >
                                            <Link href={item?.path}>
                                                <a className="font-normal transition-all hover:text-primary">
                                                    {item?.title}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="homecarousel-container md:mx-[100px] mx-[15px]">
                    <div className="inner-container border-t border-[#ededed] pt-[35px] pb-[25px]">
                        <div className="grid grid-cols-12">
                            <div className="lg:col-span-6 col-span-12 max-md:order-2">
                                <span className="flex lg:justify-start justify-center items-center pt-[10px]">
                                    © {new Date().getFullYear()} Mesobstore.
                                    <Link href={footerItems[0]?.copyrightLink}>
                                        <a className="font-normal ml-[5px] transition-all hover:text-primary">
                                            All Rights Reserved.
                                        </a>
                                    </Link>
                                </span>
                            </div>
                            <div className="lg:col-span-6 col-span-12 max-md:order-1">
                                <div className="social-link flex lg:justify-end justify-center">
                                    <h2 className="text-[16px] pr-[65px]">
                                        {footerItems[0]?.socialTitle}
                                    </h2>
                                    <ul className="flex">
                                        {footerItems[0]?.socialList?.map(
                                            (item) => {
                                                const Social =
                                                    FaIcons[item.socialIcon];
                                                return (
                                                    <li
                                                        className="mr-[25px] last:mr-0"
                                                        key={item.id}
                                                    >
                                                        <Link href={item?.path}>
                                                            <a className="transition-all hover:text-primary">
                                                                <Social />
                                                            </a>
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

FooterCompsThree.propTypes = {
    footerItems: PropTypes.instanceOf(Object).isRequired,
};

export default FooterCompsThree;
