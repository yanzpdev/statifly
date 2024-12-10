'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { TopItemsProps } from '@/types/topitems';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';


type ShowCaseProps = {
  apiRoute: string;
  timeRange: 'short_term' | 'medium_term' | 'long_term';
};

const ShowCaseComponent: React.FC<ShowCaseProps> = ({ apiRoute, timeRange }) => {
  const [topItems, setTopItems] = useState<TopItemsProps | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    setTopItems(null);
    const fetchTopItems = async () => {
      const res = await fetch(`api/spotify/${apiRoute}?time_range=${timeRange}&limit=15`);
      const data = await res.json();

      if (res.ok) {
        setTopItems(data);
      } 
      
      else {
        console.error('Failed to fetch data.');
      }
    };

    fetchTopItems();
  }, [timeRange]);

  const handleNextClick = () => {
    if (swiperRef.current) {
      const nextIndex = swiperRef.current.swiper.realIndex + 5; 
      swiperRef.current.swiper.slideTo(nextIndex);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current) {
      const prevIndex = swiperRef.current.swiper.realIndex - 5; 
      swiperRef.current.swiper.slideTo(prevIndex);
    }
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className="font-bold text-2xl mb-5">Top {apiRoute === 'top-artists' ? 'Artists' : 'Tracks'}</h1>
        <div className='flex justify-center items-center gap-5 mb-5'>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handlePrevClick}
          >
            <ChevronLeft />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleNextClick}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <motion.div
        key={timeRange}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {topItems ? (
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            loop={false}
            className="w-10/12 mx-auto"
            simulateTouch={false} 
            touchStartPreventDefault={false} 
          >
            {topItems.items.map((item: any, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center">
                {apiRoute !== 'top-genres' && (
                  <Image
                    src={
                      apiRoute === 'top-artists'
                        ? item.images[0].url
                        : apiRoute === 'top-tracks'
                        ? item.album.images[0].url
                        : ''
                    }
                    alt={item.name}
                    width={150}
                    height={150}
                    className="w-52 h-52 rounded-sm m-auto"
                    priority
                  />
                )}
                <h2 className="font-bold text-sm text-center p-2">{index + 1}.&nbsp; {item.name}</h2>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-10/12 mx-auto">
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              loop={false}
              className="w-full"
            >
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <SwiperSlide key={index} className="flex flex-col items-center">
                    <Skeleton className="rounded-sm w-52 h-52" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </motion.div>
      {!topItems && (
        <h2 className="col-span-5 font-bold text-sm text-center p-2 bg-mute/50">Loading...</h2>
      )}
      <div className='flex items-center justify-end'>
        <Button
          variant={"outline"}
        >
          See all
        </Button>
      </div>
    </>
  );
};

export default ShowCaseComponent;
