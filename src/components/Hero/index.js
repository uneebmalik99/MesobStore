import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { API , graphqlOperation} from 'aws-amplify';
import SwiperComps, { Slide } from '../SwiperComps';

function HeroOne({ func,heroDefaultItems, settings }) {
        const listBannerQuerie = `
query MyQuery {
  listBanners {
    items {
      id
      image
    }
  }
}
`;

console.log(JSON.stringify(heroDefaultItems))
    const [activeIdx, setActiveId] = useState(0);
    const [BannerImages, setBannerImages]= useState([])
    const onSlideChange = (SwiperComps) => {
        const { activeIndex } = SwiperComps;
        setActiveId(activeIndex);
    };
    const onSlideChangeTransitionStart = () => {
        setActiveId(-1);
    };

    const onSlideChangeTransitionEnd = (SwiperComps) => {
        const { activeIndex } = SwiperComps;
        setActiveId(activeIndex);
    };

    settings = {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: { clickable: true, type: 'bullets' },
        navigation: false,
        slidesPerView: 1,
        spaceBetween: 0,
        onSlideChange,
        onSlideChangeTransitionStart,
        onSlideChangeTransitionEnd,
    };

    // Tailwind Related Stuff
    const secondaryButton =
        'inline-flex items-center bg-secondary text-white leading-[38px] text-[15px] h-[38px] px-5';

    const fetchBannerImages = async () => {
        try {
            const res = await API.graphql(
                graphqlOperation(listBannerQuerie, {})
            );
            console.log(`kmkkm${res}`);
            // setBannerImages(makeBanneData(res?.data?.listBanners?.items));
        } catch (error) {
            console.log(error, 'fetchBannerImages');
        }
    };

    const makeBanneData = data => {
        return data.map(item => {
          return {uri: item.image, ...item};
        });
      };
      
    useEffect(() => {
     
        const fetchBannerImages = async () => {
          try {
            const res = (await API.graphql(
              graphqlOperation(listBannerQuerie, {}),
            )) ;
            console.log("banner sis "+ JSON.stringify(res.data))
            setBannerImages(makeBanneData(res?.data?.listBanners?.items));
          } catch (error) {
            console.log(error, 'fetchBannerImages');
          }
        };
        Promise.all([fetchBannerImages()]).then(() => {});
      }, []);

    return (
        <div className="hero-area">
            {/* <div className="container-fluid px-[0px] mt-[15px]">
                <SwiperComps
                    sliderCName="pagination-bg-primary"
                    settings={settings}
                >
                    {BannerImages?.map((BannerImages, idx) => (
                        <Slide key={BannerImages.id}>
                            <div
                                className={`${BannerImages.image
                                    .split(' ')
                                    .join(' ')} md:h-[800px] h-[540px]`}
                                    style={{backgroundImage:`url(${BannerImages.image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundColor:'red',
                                    
                                }}
                            >
                                <div className="container" >
                                    <div className="hero-content  md:h-[800px] h-[540px]">
                                        <motion.span
                                            className="text-primary font-medium block mb-[5px]"
                                            dangerouslySetInnerHTML={{
                                                __html: BannerImages.subtitle,
                                            }}
                                            
                                            initial="hidden"
                                            animate={
                                                idx === activeIdx
                                                    ? 'visible'
                                                    : 'exit'
                                            }
                                            exit="exit"
                                            variants={{
                                                hidden: {
                                                    y: '100%',
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    y: '0',
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.3,
                                                    },
                                                },
                                                exit: {
                                                    y: '100%',
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.3,
                                                    },
                                                },
                                            }}
                                        />
                                        <motion.h2
                                            className="relative md:text-[60px] text-[34px] leading-[1.1] pb-[15px] mb-[30px] after:bg-primary after:absolute after:min-h-[4px] after:min-w-[70px] after:max-h-[4px] after:max-w-[70px] after:bottom-0 after:left-0"
                                            dangerouslySetInnerHTML={{
                                                __html: BannerImages.title,
                                            }}
                                            initial="hidden"
                                            animate={
                                                idx === activeIdx
                                                    ? 'visible'
                                                    : 'exit'
                                            }
                                            exit="exit"
                                            variants={{
                                                hidden: {
                                                    y: '100%',
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    y: '0',
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.6,
                                                    },
                                                },
                                                exit: {
                                                    y: '100%',
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.6,
                                                    },
                                                },
                                            }}
                                        />
                                        <motion.p
                                            dangerouslySetInnerHTML={{
                                                __html: BannerImages.desc,
                                            }}
                                            initial="hidden"
                                            animate={
                                                idx === activeIdx
                                                    ? 'visible'
                                                    : 'exit'
                                            }
                                            exit="exit"
                                            variants={{
                                                hidden: {
                                                    y: '100%',
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    y: '0',
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.9,
                                                    },
                                                },
                                                exit: {
                                                    y: '100%',
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.9,
                                                    },
                                                },
                                            }}
                                        />
                                        <motion.div
                                            className="mt-[30px]"
                                            initial="hidden"
                                            animate={
                                                idx === activeIdx
                                                    ? 'visible'
                                                    : 'exit'
                                            }
                                            exit="exit"
                                            variants={{
                                                hidden: {
                                                    y: '100%',
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    y: '0',
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 1.2,
                                                    },
                                                },
                                                exit: {
                                                    y: '100%',
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 1.2,
                                                    },
                                                },
                                            }}
                                        >
                                            <Link href="/products/left-sidebar">
                                                <a className={secondaryButton}>
                                                    Shop Now
                                                    <IoArrowForwardOutline className="text-white ml-[5px]" />
                                                </a>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    ))}
                </SwiperComps>
            </div> */}

            <div className="container-fluid px-[0px] mt-[15px]">
                <SwiperComps
                    sliderCName="pagination-bg-primary"
                    settings={settings}
                >
                    {BannerImages?.map((BannerImages, idx) => (
                        <Slide key={BannerImages.id}>
                            <div
                                className={`${BannerImages.image
                                    .split(' ')
                                    .join(' ')} md:h-[800px] h-[540px]`}
                                    style={{backgroundImage:`url(${BannerImages.image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                
                                }}
                                    
                            >
                                <div className="container"  >
                                    <div className="hero-content" style={{position:"absolute",  marginTop:'15%', padding:'3%',borderRadius:10, backgroundColor: 'rgba(211, 211, 211 ,0.2)' }}>
                                       
                                        <motion.h2
                                            className="text-primary  relative md:text-[60px] text-[34px] leading-[1.1] pb-[15px] mb-[30px] after:bg-primary after:absolute after:min-h-[4px] after:min-w-[70px] after:max-h-[4px] after:max-w-[70px] after:bottom-0 after:left-0"
                                            dangerouslySetInnerHTML={{
                                                __html: "Welcome to  <br/>  &nbsp &nbsp  &nbsp   Mesob Store",
                                            }}
                                            initial="hidden"
                                            animate={
                                                idx === activeIdx
                                                    ? 'visible'
                                                    : 'exit'
                                            }
                                            exit="exit"
                                            variants={{
                                                hidden: {
                                                    y: '100%',
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    y: '0',
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.6,
                                                    },
                                                },
                                                exit: {
                                                    y: '100%',
                                         
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 0.6,
                                                    },
                                                },
                                            }}
                                        />
                                        
                                        <motion.div
                                            className="mt-[30px]"
                                            initial="hidden"
                                            animate={

                                                idx === activeIdx
                                                    ? 'visible'
                                                    : 'exit'
                                            }
                                            exit="exit"
                                            variants={{
                                                hidden: {
                                                    y: '100%',
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    y: '0',
                                                    opacity: 1,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 1.2,
                                                    },
                                                },
                                                exit: {
                                                    y: '100%',
                                                    opacity: 0,
                                                    transition: {
                                                        duration: 1,
                                                        delay: 1.2,
                                                    },
                                                },
                                            }}
                                        >
                                           <Link href="">
                                                <a  onClick={()=> {
                                        func();
                                        }
                                        }  className={secondaryButton}>
                                                    Shop Now
                                                    <IoArrowForwardOutline className="text-white ml-[5px]" />
                                                </a>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </Slide>
                    ))}
                </SwiperComps>
            </div>

        </div>
    );
}

HeroOne.propTypes = {
    heroDefaultItems: PropTypes.instanceOf(Object).isRequired,
    settings: PropTypes.shape({
        slidesPerView: PropTypes.number,
        spaceBetween: PropTypes.number,
        breakpoints: PropTypes.shape({}),
    }),
};

export default HeroOne;
