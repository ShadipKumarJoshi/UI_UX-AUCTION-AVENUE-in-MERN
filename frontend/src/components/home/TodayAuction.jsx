import SingleAuction from "../SingleAuction";
import { useSelector, useDispatch } from "react-redux";
import { getLiveAuctions } from "../../store/auction/auctionSlice";
import { useEffect, useState } from "react";

const TodayAuction = () => {
  const dispatch = useDispatch();
  const { liveAuctions } = useSelector((state) => state.auction);
  const [todayAuctions, setTodayAuctions] = useState([]);

  useEffect(() => {
    dispatch(getLiveAuctions());
  }, [dispatch]);

  useEffect(() => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const filteredAuctions = liveAuctions
      ?.filter((auction) => {
        const endTime = new Date(auction.endTime);
        return endTime >= now && endTime <= endOfDay;
      })
      .sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

    setTodayAuctions(filteredAuctions);
  }, [liveAuctions]);

  useEffect(() => {
    const interval = setInterval(() => {
      const swiperContainer = document.querySelector('swiper-container');
      if (swiperContainer && swiperContainer.swiper) {
        const swiper = swiperContainer.swiper;
        swiper.params.slidesPerGroup = 1; 
        if (swiper.isEnd) {
          swiper.appendSlide(swiper.slides[0].outerHTML); 
          swiper.removeSlide(0); 
        }
        swiper.slideNext();
      }
    }, 1000); 


    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="today-auction">
        <div className="flex gap-2 items-center mb-5">
          <div>
            <span className="absolute animate-ping flex rounded-full h-3 w-3 bg-red-500"></span>
            <span className="relative flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <h2 className="text-2xl font-bold text-white">Today’s Auctions</h2>
        </div>
        <swiper-container
          breakpoints={JSON.stringify({
            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },
          })}
          style={{
            "--swiper-navigation-color": "#FF5733",
          }}
          navigation="true"
          slides-per-view="1"
          space-between="16"
        >
          {todayAuctions?.map((item) => (
            <swiper-slide key={item._id}>
              <SingleAuction
                name={item?.name}
                startingPrice={item?.startingPrice}
                image={item?.image}
                endTime={item?.endTime}
                startTime={item?.startTime}
                id={item?._id}
                status={item?.status}
                sellerImage={item?.seller?.profilePicture}
                sellerName={item?.seller?.fullName}
                sellerId={item?.sellerId}
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </>
  );
};

export default TodayAuction;
